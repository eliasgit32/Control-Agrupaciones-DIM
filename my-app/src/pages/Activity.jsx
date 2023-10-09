import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Activity.css';
import '../stylesheets/Group.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOneActivity, updateActivity } from '../API/activities';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns';
import ParticipationContainer from '../components/ParticipationContainer';


export default function Activity() {
  const params = useParams();

  const [selectedTerm, setSelectedTerm] =  useState(params.selectedTerm);

  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] =  useState(null);

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value);
  const changeDescription = e => setDescription(e.target.value);

  const {isLoading, data} = useQuery(['activity', params.id, params.idAct, selectedTerm],
  () => getOneActivity(params.id, params.idAct, selectedTerm));

  const queryClient = useQueryClient();

  //Mutación actualizar actividad
  const updateActivityMutation = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(['activity', params.id, params.idAct, selectedTerm]);
    }
  })

  if (isLoading) {
    return (
      <>
        <NavBar></NavBar>
        <InfoSideBar>Cargando...</InfoSideBar>;
      </>
    ) 
  }

  //Verificar que los inputs estan vacios o no hayan cambiado su valor
  const invalidInputs = ( (name === null || name === data.nombreAct) && 
  (description === null || description === data.descripcionAct) 
  && (startDate === null || startDate.toISOString() === data.fechaInicio) && 
  (endDate === null || endDate.toISOString() === data.fechaFin));

  //Cancelar actualización de datos
  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data en ellos
    setName(null);
    setDescription(null);
    setStartDate(null);
    setEndDate(null);  
  }

  //Actualizar datos
  const handleUpdate = () => {
    const activity = {
      name: document.getElementById('actName').value,
      description: document.getElementById('actDesc').value,
      startDate: (startDate ? startDate.toISOString().slice(0, 10) : data.fechaInicio),
      endDate: (endDate ? endDate.toISOString().slice(0, 10) : data.fechaFin)
    }
    updateActivityMutation.mutate(
      {
        idGroup: params.id,
        idAct: params.idAct,
        term: selectedTerm,
        activity: activity
      }
    )
  }

  return(
    <div>
      <NavBar/>
      <InfoSideBar>
        {/* Nombre Actividad */}
        <div className='my-4'>
          <input type="text"
          className='form-control text-center'
          id='actName'
          dark='true'
          onChange={changeName} 
          value={name || (name !== '' ? data.nombreAct : '')}/>
        </div>
        {/* Nombre de Agrupación */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-6' act-label='true'>
            Nombre Agrupación:
          </label>
          <div className='col-sm-5'>
            <Link to={`/group/${params.id}/${selectedTerm}`} className='link'>
              <p>{data.nombreAgrupacion}</p>
            </Link>
          </div>
        </div>
        {/* Descripción */}
        <div className='mb-3'>
          <label htmlFor="actDesc" className='form-label' act-label='true'>
            Descripcion
          </label>
          <textarea 
          className="form-control"
          id="actDesc" 
          rows="4"
          dark='true'
          onChange={changeDescription}
          value={description || (description !== '' ? data.descripcionAct : '')}></textarea>
        </div>
        {/* Cant. Esperada */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-5 col align-self-center' act-label='true'>
            Cant. Esperada:
          </label>
          <div className='col-sm-5'>
            <input 
            type="text"
            className='form-control'
            readOnly={true}
            dark='true'
            defaultValue='*Nro inscritos*'/>
          </div>
        </div>
        {/* Cant. Total */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-4 col align-self-center' act-label='true'>
            Cant. Total:
          </label>
          <div className='col-sm-6'>
            <input 
            type="text"
            className='form-control'
            readOnly={true}
            dark='true'
            defaultValue='*Nro participantes*'/>
          </div>
        </div>
        {/* Fecha inicio */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-5 col align-self-center' act-label='true'>
            Fecha Inicio:
          </label>
          <div className='col-sm-6'>
            <DatePicker 
              selected={startDate || (data.fechaInicio ? parseISO(data.fechaInicio) : null)}
              onChange={(date) => setStartDate(date)}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        </div>
        {/* Fecha fin */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-5 col align-self-center' act-label='true'>
            Fecha Fin:
          </label>
          <div className='col-sm-6'>
            <DatePicker
              selected={endDate || (data.fechaFin ? parseISO(data.fechaFin) : null)}
              onChange={(date) => setEndDate(date)}
              dateFormat='dd/MM/yyyy'
            />
          </div>
        </div>

        {/* Botones de guardado y cancelacion */}
        <div className='text-center'>
          <button
          type='button'
          className={invalidInputs ? 'btn btn-danger disabled' : 'btn btn-danger'}
          onClick={handleCancel}>Cancelar</button>
          <button
          type='button'
          className={invalidInputs ? 'btn btn-success disabled' : 'btn btn-success'}
          onClick={handleUpdate}>Guardar Cambios</button>
        </div>
      </InfoSideBar>

      <ParticipationContainer 
        selectedTerm={selectedTerm} 
        setSelectedTerm={setSelectedTerm} 
        groupID={params.id}
        activityID={params.idAct}
      />
    </div>
  )
}