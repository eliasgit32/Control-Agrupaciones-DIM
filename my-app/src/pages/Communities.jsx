import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import NavBar from '../components/NavBar';
import TableCommunities from '../components/tables/TableCommunities';
import { useState } from 'react';
import { createCommunity } from '../API/communities';

export default function Communities() {
  //Inputs
  const[name, setName] =  useState('');
  const[type, setType] =  useState('Escuela');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value)
  const changeType = e => setType(e.target.value)

  const handleReset = () => {
    setName('');
    setType('Escuela');
  }

  const queryClient = useQueryClient();
  
  //Hook de mutación para operaciones POST
  const addCommunityMutation = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })


  const handleSave = () => {
    const newCommunity = {
      name: name,
      type: type
    } 
    addCommunityMutation.mutate(newCommunity);
    handleReset();
  }

  return(
    <>
      <NavBar />
      <div className='d-flex ps-5 ms-5 justify-content-start'>
        <div className='col-md-5'>
          <TableCommunities />
        </div>
        {/* Formulario de registro de comunidades */}
        <div className='col-md-5 container position-fixed' style={{right: '60px'}}>
          {/* Input de nombre */}
          <div className='mb-3 d-flex'>
            <label htmlFor="newCommName" className='form-label col-sm-2 me-1'>Nombre:</label>
            <div className='col-sm-7'>
              <input 
                type="text" 
                className='form-control' 
                id='newCommName'
                onChange={changeName}
                defaultValue={name}
              />
            </div>
          </div>
          {/* Select tipo de comunidad */}
          <div className='mb-3 d-flex'>
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
              Agregar
            </button>
          </div>
        </div>
      </div>
      
    </>
  )
}