import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { createGroup } from '../API/group';
import '../stylesheets/NewGroup.css'

export default function NewGroup() {
  //Inputs
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[limit, setLimit] = useState(0);
  const[publico, setPublico] = useState('Estudiantes');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value)
  const changeDescription = e => setDescription(e.target.value)
  const changeLimit = e => setLimit(e.target.value)
  const changePublico = e => setPublico(e.target.value)

  //Reinicializar los inputs al cerrar el modal
  const handleClose = () => {
    setName('');
    setDescription('');
    setLimit(0);
    setPublico('Estudiantes');
  }

  const queryClient = useQueryClient();

  //Enviar hook para enviar agrupacion al backend
  const addGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  //Guardar Agrupacion
  const handleSave = () => {
    const newGroup = {
      name: name,
      description: description,
      limit: limit,
      publico: publico
    } 
    addGroupMutation.mutate(newGroup);
    handleClose();
  }

  return(
    <div className='modal fade' id='modalNewGroup' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Nueva Agrupación</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'> 
          {/* Nombre */}
          <div className='mb-3'>
            <label htmlFor='newGroupName' className='form-label'>Nombre</label>  
            <input 
            type="text" 
            className='form-control' 
            id='newGroupName' 
            onChange={changeName}
            value={name}/>
          </div>
          {/* Descripcion */}
          <div className='mb-3'>
            <label htmlFor='newGroupDesc' className='form-label'>Descripción</label>  
            <textarea 
            className='form-control' 
            id='newGroupDesc' 
            rows='3' 
            onChange={changeDescription}
            value={description}></textarea>
          </div>
          {/* Cupos */}
          <div className='mb-3 row'>
            <label htmlFor='newGroupLimit' className='form-label col-sm-3'>Cupos</label>
            <div className='col-sm-3'>
              <input 
              type='number' 
              className='form-control' 
              id='newGroupLimit' 
              min='0' 
              onChange={changeLimit}
              value={limit}/>
            </div> 
          </div>
          {/* Publico */}
          <div className='mb-3 row'>
            <label htmlFor='newGroupPublic' className='form-label col-sm-4'>Dirigido a:</label>
            <div className='col-sm-5'>
              <select 
              className='form-select' 
              id="newGroupPublic" 
              onChange={changePublico}
              value={publico}>
                <option value="Estudiantes">Estudiantes</option>
                <option value="Docentes">Docentes</option>
                <option value="Personal">Personal</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div> 
          </div>
            
          </div>
          <div className='modal-footer'>
            <button 
            type='button' 
            className='btn btn-danger' 
            data-bs-dismiss='modal'
            onClick={handleClose}>Cancelar</button>
            <button 
            type='button' 
            className='btn btn-success'
            data-bs-dismiss='modal'
            onClick={handleSave}>
              Guardar Agrupación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}