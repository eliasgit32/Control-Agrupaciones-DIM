import React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Activity.css';
import TermSelect from '../components/TermSelect';
import TableParticipants from '../components/TableParticipants';
import '../stylesheets/Group.css';

export default function Activity() {
  const params = useParams();
  console.log(params);
  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] =  useState(null);

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value);
  const changeDescription = e => setDescription(e.target.value);
  const changeStartDate = e => setStartDate(e.target.value);
  const changeEndDate = e => setEndDate(e.target.value);

  //Cancelar actualización de datos
  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data[0] en ellos
    setName(null);
    setDescription(null);
    setStartDate(null);
    setEndDate(null);  
  }

  //Actualizar datos
  const handleUpdate = () => {

  }

  //Verificar que los inputs estan vacios o no hayan cambiado su valor
  const invalidInputs = ( (name === null || name) && (description === null) 
  && (startDate === null) && (endDate === null));

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
          defaultValue='Nombre de Actividad'/>
        </div>
        {/* Nombre de Agrupación */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-6' act-label='true'>
            Nombre Agrupación:
          </label>
          <div className='col-sm-5'>
            <Link to={`/group/${params.id}`} className='link'>
              <p>Grupo 1...</p>
              {/* <input 
              type="text"
              className='form-control'
              readOnly={true} 
              dark='true'
              defaultValue='Grupo 1...'/> */}
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
          defaultValue='Descripción de Actividad'></textarea>
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
          <div className='col-sm-5'>
            <input 
            type="date"
            className='form-control'
            dark='true'
            onChange={changeStartDate}
            defaultValue='2023-09-16'/>
          </div>
        </div>
        {/* Fecha fin */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-5 col align-self-center' act-label='true'>
            Fecha Fin:
          </label>
          <div className='col-sm-5'>
            <input 
            type="date"
            className='form-control'
            dark='true'
            onChange={changeEndDate}
            value='2023-09-16'/>
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
      <div className='participants-container px-3'>
        <TableParticipants />
      </div>

      {/* Botones opciones de agrupación */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button type='button' className='btn btn-info'>Exportar Lista de Participantes</button>
      </div>
    </div>
  )
}