import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { getRegisteredParticipants, registerOnGroup } from '../../API/participants';
import TableRegistration from '../tables/TableRegistration';

export default function SignUpParticipants(props) {

  const {selectedTerm, 
    groupID, 
    setSelectedParticipant,
    setModalVisible} = props;

  const [participant, setParticipant] = useState('');
  
  const changeParticipant = e => setParticipant(e.target.value);
  
  const queryClient = useQueryClient();

  const signUpParticipantMutation = useMutation({
    mutationFn: registerOnGroup,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleClose = () => {
    setParticipant('');
  }

  //Inscribir Participante
  const handleSave = () => {
    const newParticipant = {
      cedula: participant,
      groupID: groupID,
      term: selectedTerm
    }
    signUpParticipantMutation.mutate(newParticipant);
    handleClose();
  }
  
  const { isLoading, data } = useQuery(['registeredParticipants', groupID, selectedTerm],
  () => getRegisteredParticipants(groupID, selectedTerm));

  if (isLoading) {
    return (
      <div className='modal modal-lg fade' id='modalSignUpParticipants' aria-hidden='true' tabIndex='-1'>
        Cargando...
      </div>
    )
  }

  return(
    <div className='modal modal-lg fade' id='modalSignUpParticipants' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Inscribir Participantes ({selectedTerm})</h5>
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
                  value={participant}
                  onChange={changeParticipant}
                />
                <div className='col d-flex'>
                  <button 
                    className='btn btn-info align-self-center col-sm-12'
                    onClick={handleSave}
                  >
                    Agregar Participante
                  </button>
                </div> 
              </div>
            </div>
            {/* Tabla de participantes inscritos */}
            <TableRegistration 
              data={data} 
              groupID={groupID} 
              selectedTerm={selectedTerm} 
              setSelectedParticipant={setSelectedParticipant}
              setModalVisible={setModalVisible}
            />
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-success'
              data-bs-dismiss='modal'
              onClick={handleClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}