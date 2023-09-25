import React from 'react';
import NavBar from '../components/NavBar';
import TableCommunities from '../components/TableCommunities';
import { useState } from 'react';

export default function Communities() {
  //Inputs
  const[name, setName] =  useState('')
  const[type, setType] =  useState('')

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value)
  const changeType = e => setType(e.target.value)

  const handleReset = () => {
    setName('');
    setType('Escuela');
  }

  const handleSave = () => {

  }

  return(
    <>
      <NavBar />
      <div className='row ps-4'>
        <div className='col-md-7 container'>
          <TableCommunities />
        </div>
        {/* Formulario de registro de comunidades */}
        <div className='col-md-5 container'>
          {/* Input de nombre */}
          <div className='mb-3 row'>
            <label htmlFor="newCommName" className='form-label col-sm-2'>Nombre:</label>
            <div className='col-sm-7'>
              <input 
                type="text" 
                className='form-control' 
                id='newCommName'
                onChange={changeName}
                value={name}
              />
            </div>
          </div>
          {/* Select tipo de comunidad */}
          <div className='mb-3 row'>
            <label htmlFor="newCommType" className='form-label col-sm-5'>
              Tipo de comunidad:
            </label>
            <div className='col-sm-4'>
              <select 
              className='form-select' 
              id="newCommType" 
              onChange={changeType}
              value={type}>
                <option value="Escuela">Escuela</option>
                <option value="Unidad">Unidad Adm.</option>
                <option value="Comunidad">Comunidad</option>
              </select>
            </div> 
          </div>
          <div className='d-flex justify-content-flex-start'>
            <button 
            type='button' 
            className='btn btn-danger col-sm-3'
            onClick={handleReset}>Cancelar</button>
            <button 
            type='button' 
            className='btn btn-success col-sm-3'
            onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
      
    </>
  )
}