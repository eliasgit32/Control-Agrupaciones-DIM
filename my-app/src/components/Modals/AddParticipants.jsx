import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { createHelper, getHelpers } from '../../API/activities';
import { getRegisteredParticipants, registerOnGroup } from '../../API/participants';
import TableRegistration from '../tables/TableRegistration';

export default function AddParticipants(props) {

  const { selectedTerm,
    groupID,
    activityID,
    setSelectedParticipant,
    setModalVisible, type } = props;

  //Variables para alternar funcionamiento entre registrar participante
  //o acompañante
  var mutationFn = null;

  if (type === 'SignUp') {
    // Asignar todas las variables necesarias para inscribir participante
    mutationFn = registerOnGroup;
  } else {
    mutationFn = createHelper;
  }

  const [participant, setParticipant] = useState('');

  const changeParticipant = e => setParticipant(e.target.value);

  const queryClient = useQueryClient();

  const AddParticipantMutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleClose = () => {
    setParticipant('');
  }

  //Inscribir Participante
  const handleSave = () => {
    let newParticipant = null;
    if (type === 'SignUp') {
      newParticipant = {
        cedula: participant,
        groupID: groupID,
        term: selectedTerm
      }
    } else {
      newParticipant = {
        group: groupID,
        activity: activityID,
        helper: participant,
        term: selectedTerm
      }
    }

    AddParticipantMutation.mutate(newParticipant);
    handleClose();
  }

  const { isLoading, data } = useQuery(['registeredParticipants', groupID, selectedTerm],
    () => (type === 'SignUp' ? getRegisteredParticipants(groupID, selectedTerm) : getHelpers(groupID, activityID, selectedTerm)));

  if (isLoading) {
    return (
      <div className='modal modal-lg fade' id='modalSignUpParticipants' aria-hidden='true' tabIndex='-1'>
        Cargando...
      </div>
    )
  }

  return (
    <div className='modal modal-lg fade' id='modalAddParticipants' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{type === 'SignUp' ? `Inscribir participantes ${selectedTerm}`
              : `Asignar acompañantes ${selectedTerm}`}</h5>
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
                    {type === 'SignUp' ? `Agregar participante`
                      : `Agregar acompañante`}
                  </button>
                </div>
              </div>
            </div>
            {/* Tabla de participantes inscritos o acompañantes */}
            <TableRegistration
              data={data}
              setSelectedParticipant={setSelectedParticipant}
              setModalVisible={setModalVisible}
              type={type}
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