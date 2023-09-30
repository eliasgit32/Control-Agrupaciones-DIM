import React from 'react';
import PlusButton from '../PlusButton';
import TableActivities from '../Tables/TableActivities';

export default function AddActivity(props) {
  const {selectedTerm, groupID} =  props;
  const handleClose = () => {

  }

  const handleSave = () => {

  }
  
  return(
    <div className='modal fade' id='modalAddActivity' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Añadir Actividad</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'>
            {/* Período académico seleccionado */}
            <h6>Período: {selectedTerm}</h6>
            <TableActivities groupID={groupID} />
          </div>
          {/* Botón aceptar, cancelar y nueva actividad */}
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
              <PlusButton
                type='NewActivity'
                font='17px'
                styleClass='' />
            </div>
        </div>
      </div>
    </div>
  )
}