import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { createActivity } from '../../API/activities';

export default function NewActivity(props) {
  //Inputs
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value)
  const changeDescription = e => setDescription(e.target.value)

  const handleClose = () => {
    setName('');
    setDescription('');
  }

  const queryClient = useQueryClient();

  //Hook de actividad hacia el backend
  const addActMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  //Guardar actividad
  const handleSave = () => {
    const newActivity = {
      group: props.groupID,
      name: name,
      description: description,
    }
    addActMutation.mutate(newActivity);
    handleClose();
  }
  
  return(
    <div className='modal fade' id='modalNewActivity' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content' style={{background: '#4f4e4e'}}>
          <div className='modal-header'>
            <h5 className='modal-title'>Nueva Actividad</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-toggle='modal'
              data-bs-target='#modalAddActivity'
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'>
            {/* Nombre de la agrupación */}
            <div className='mb-3'>
              <p>Nombre de la agrupación: {props.groupName}</p>
            </div>
            {/* Nombre de la actividad */}
            <div className='mb-3'>
              <label htmlFor="newActName" className='form-label'>Nombre</label>
              <input 
                type="text" 
                className='form-control' 
                id='newActName' 
                onChange={changeName}
                value={name}
              />
            </div>
            {/* Descripción */}
            <div className='mb-3'>
              <label htmlFor="NewActDesc" className='form-label'>Descripción</label>
              <textarea
                className='form-control'
                id='newActDesc'
                rows='3'
                onChange={changeDescription}
                value={description}
              >
              </textarea>
            </div>
          </div>
          {/* Botones Aceptar y cancelar */}
          <div className='modal-footer'>
            <button 
            type='button' 
            className='btn btn-danger' 
            data-bs-toggle='modal'
            data-bs-target='#modalAddActivity'
            data-bs-dismiss='modal'
            onClick={handleClose}>Cancelar</button>
            <button 
            type='button' 
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target='#modalAddActivity'
            data-bs-dismiss='modal'
            onClick={handleSave}>
              Guardar Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}