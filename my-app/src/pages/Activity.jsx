import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Activity.css';
import TermSelect from '../components/TermSelect';
import TableParticipants from '../components/Tables/TableParticipants';
import '../stylesheets/Group.css';
import { useQuery } from '@tanstack/react-query';
import { getOneActivity } from '../API/activities';

export default function Activity() {
  const params = useParams();
  console.log(params);

  const [selectedTerm, setSelectedTerm] =  useState(params.selectedTerm);

  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[startDate, setStartDate] = useState('dd/mm/aaaa');
  const[endDate, setEndDate] =  useState('dd/mm/aaaa');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value);
  const changeDescription = e => setDescription(e.target.value);
  const changeStartDate = e => setStartDate(e.target.value);
  const changeEndDate = e => setEndDate(e.target.value);

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

  }
  const {isLoading, data} = useQuery(['activity', params.id, params.idAct, selectedTerm],
  () => getOneActivity(params.id, params.idAct, selectedTerm));

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
  && (startDate === 'dd/mm/aaaa' || startDate === data.fechaInicio) && 
  (endDate === 'dd/mm/aaaa' || endDate === data.fechaFin));

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
            <Link to={`/group/${params.id}`} className='link'>
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
            <input 
            type="date"
            className='form-control'
            dark='true'
            onChange={changeStartDate}
            value={startDate || (startDate !== 'dd/mm/aaaa' ? data.fechaInicio : 'dd/mm/aaaa')}/>
          </div>
        </div>
        {/* Fecha fin */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-5 col align-self-center' act-label='true'>
            Fecha Fin:
          </label>
          <div className='col-sm-6'>
            <input 
            type="date"
            className='form-control'
            dark='true'
            onChange={changeEndDate}
            value={endDate || (endDate !== 'dd/mm/aaaa' ? data.fechaInicio : 'dd/mm/aaaa')}/>
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

      {/* Select de períodos académicos */}
      <div className='term-container'>
        <div className='text-center justify-content-center row mt-4'>
          <label htmlFor="selectTerms" className='form-label col-sm-2'>Períodos</label>
          <div className='col-sm-4'>
            <TermSelect />
          </div>
        </div>
      </div>

      {/* Tabla de participantes */}
      <div className='participants-container'>
        <TableParticipants />
      </div>

      {/* Botones opciones de agrupación */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button type='button' className='btn btn-info'>Exportar Lista de Participantes</button>
      </div>
    </div>
  )
}