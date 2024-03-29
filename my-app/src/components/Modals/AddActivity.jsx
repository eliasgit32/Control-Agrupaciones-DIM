import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createConformation } from '../../API/activities';
import PlusButton from '../PlusButton';
import TableActivities from '../tables/TableActivities';

export default function AddActivity(props) {

  var selectedAct = [];

  const changeSelectedAct = (array) => {
    selectedAct = array;
  }

  const {selectedTerm, groupID, data} =  props;

  const queryClient =  useQueryClient();

  //Mutación crear nueva conformación de agrupación
  const addConformationMutation =  useMutation({
    mutationFn: createConformation,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleCancel = () => {
    queryClient.invalidateQueries(['activities', groupID, selectedTerm]);
  }

  const handleSave = () => {
    addConformationMutation.mutate(
      {group: groupID, activities: selectedAct, term: selectedTerm}
    );
  }
  
  return(
    <div className='modal fade' id='modalAddActivity' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content' style={{background: '#4f4e4e'}}>
          <div className='modal-header'>
            <h5 className='modal-title'>Añadir Actividad</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleCancel}>
            </button>
          </div>
          <div className='modal-body'>
            {/* Período académico seleccionado */}
            <h5>Período: {selectedTerm}</h5>
            <TableActivities 
              groupID={groupID} 
              selectedTerm={selectedTerm}
              changeSelectedAct={changeSelectedAct}
              data={data}
            />
          </div>
          {/* Botón aceptar, cancelar y nueva actividad */}
          <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={handleCancel}>Cancelar</button>
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