import React from 'react';

export default function NewActivity() {
  const handleClose = () => {

  }

  const handleSave = () => {

  }
  
  return(
    <div className='modal fade' id='modalNewActivity' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Nueva Actividad</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'>
            {/* Nombre de la agrupación */}
            <div className='mb-3'>
              <p>Nombre de la agrupación: {'Agrupación ABC'}</p>
            </div>
            {/* Nombre de la actividad */}
            <div className='mb-3'>
              <label htmlFor="newActName" className='form-label'>Nombre</label>
              <input 
                type="text" 
                className='form-control' 
                id='newActName' 
              />
            </div>
            {/* Descripción */}
            <div className='mb-3'>
              <label htmlFor="NewActDesc" className='form-label'>Descripción</label>
              <textarea
                className='form-control'
                id='newActDesc'
                rows='3'>
              </textarea>
            </div>
          </div>
          {/* Botones Aceptar y cancelar */}
          <div className='modal-footer'>
            <button 
            type='button' 
            className='btn btn-danger' 
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