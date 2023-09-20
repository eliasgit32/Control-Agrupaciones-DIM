import React from 'react';
import TableParticipants from './TableParticipants';

export default function SignUpParticipants() {
  const handleClose = () => {

  }

  const handleSave = () => {

  }
  
  return(
    <div className='modal modal-lg fade' id='modalSignUpParticipants' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Inscribir Participantes</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>  
            </button>
          </div>
          <div className='modal-body'>
            {/* Input de cédula */}
            <div className='d-flex justify-content-start'>
              <div className='mb-3 row'>
                <label htmlFor="cedParticipant" className='form-label col align-self-center col-sm-2'>Cédula</label>
                <input 
                  type="text" 
                  className='form-control col h-auto align-self-center' 
                  id='cedParticipant' 
                />
                <div className='col d-flex'>
                  <button className='btn btn-info align-self-center col-sm-12'>
                    Agregar Participante
                  </button>
                </div> 
              </div>
            </div>
            {/* Tabla de participantes inscritos */}
            <TableParticipants />
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
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}