import React from 'react';

export default function ActNotification (props) {

  const { show } =  props;

  return(
    <div className='toast-container position-fixed bottom-0 end-0 p-3'>
      <div className={`toast ${show}`} role='alert'>
        <div className='toast-header'>
          <strong className='me-auto'>Actividades Finalizadas</strong>
          <button type='button' className='btn-close ms-2 mb-1' data-bs-dismiss='toast'>
          </button>
        </div>
        <div className='toast-body'>
          <p style={{fontSize: '15px'}}>Tiene actividades finalizadas sin registrar participación</p>
          <button 
            type='button' 
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#modalFinishedActivities'
          >
            Ver Actividades
          </button>
        </div>
      </div>
    </div>
  )
}