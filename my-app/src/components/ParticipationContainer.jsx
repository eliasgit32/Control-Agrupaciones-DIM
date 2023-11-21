import React from 'react';
import TermSelect from './TermSelect';
import TableParticipants from './tables/TableParticipants';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getParticipations } from '../API/participations';
import AddParticipants from './modals/AddParticipants';
import ConfirmOperation from './modals/ConfirmOperation';
import { useState } from 'react';
import { deleteHelper } from '../API/activities';

export default function ParticipationContainer(props) {
  const {selectedTerm, setSelectedTerm, groupID, activityID} = props;
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalVisible, setModalVisible] =  useState(false);

  //Query solicitar participantes de la agrupación
  const {isLoading, data} = useQuery(['participations', groupID, selectedTerm, activityID],
    () => getParticipations(groupID, selectedTerm, activityID)
  )

  const queryClient = useQueryClient();

  //Mutación borrar acompañante
  const deleteHelperMutation =  useMutation({
    mutationFn: deleteHelper,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  if (isLoading) return <div 
    style={{position: 'absolute', top: '150px', left: '355px'}}
  >
    Cargando...
  </div>
  
  return (
    <>
      {/* Select de períodos académicos */}
      <div className='term-container'>
        <div className='text-center justify-content-center row mt-4'>
          <label htmlFor="selectTerms" className='form-label col-sm-2'>Períodos</label>
          <div className='col-sm-4'>
            <TermSelect selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
          </div>
        </div>
      </div>

      {/* Tabla de participantes */}
      <div className='participants-container'>
        <TableParticipants 
          groupID={groupID} 
          activityID={activityID}
          selectedTerm={selectedTerm} 
          data={data} 
        />
      </div>

      {/* Botones opciones de actividad */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button type='button' className='btn btn-info'>Exportar Lista de Participantes</button>
        <button 
          type='button' 
          className='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#modalAddParticipants'
        >
          Agregar acompañantes
        </button>
      </div>
      {/* Modal de inscribir participante - Agregar acompañantes */}
      <AddParticipants 
        selectedTerm={selectedTerm} 
        groupID={groupID} 
        activityID={activityID}
        setSelectedParticipant={setSelectedParticipant} 
        setModalVisible={setModalVisible}
        type='Helpers'
      />
      <ConfirmOperation 
        operation={() => 
          {
            const helper = {
              group: groupID,
              activity: activityID,
              helper: selectedParticipant,
              term: selectedTerm
            }

            deleteHelperMutation.mutate(helper)
          }
        }
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedParticipant={selectedParticipant}
      />
    </>
  )
}