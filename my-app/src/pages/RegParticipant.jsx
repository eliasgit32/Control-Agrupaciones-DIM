import React from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/tables/TableAllParticipants';
import PlusButton from '../components/PlusButton';
import { useParams } from 'react-router-dom';
import NewParticipant from '../components/modals/NewParticipant';
import { deleteParticipant, getComunnityMembers, getPersonal, getStudents } from '../API/participants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmOperation from '../components/modals/ConfirmOperation';
import ImportParticipants from '../components/modals/ImportParticipants';

export default function RegParticipant() {
  const params = useParams();

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalVisible, setModalVisible] =  useState(false);

  const queryClient = useQueryClient();

  // Mutación borrar participante
  const deleteParticipantMutation = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  var community = '';
  var getFunction = null;

  if(params.type === 'Comunidad') {
    community = 'Comunidad';
    getFunction =  getComunnityMembers;
  } else if(params.type === 'Estudiante') {
    community = 'Escuela';
    getFunction = getStudents;
  } else {
    community = 'Escuela/Unidad';
    getFunction = getPersonal;
  }

  const { isLoading, data } = useQuery(['getParticipants', community], getFunction);

  if (isLoading) {
    return (
      <>
      <NavBar />
      <div style={{color: '#343434'}}>Cargando...</div>
      </>
    )
  } 
  
  return(
    <>
      <NavBar />
      <div className='mx-3'> 
        <TableAllParticipants 
          type={params.type} 
          community={community} 
          data={data}
          setSelectedParticipant={setSelectedParticipant}
          setModalVisible={setModalVisible} 
        />
      </div>
      <ConfirmOperation 
        operation={() => {
          deleteParticipantMutation.mutate(selectedParticipant);
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedParticipant={selectedParticipant}
        type='deleteParticipant'
      />
      <div className='mb-4'></div>
      {/* Botones de registrar o importar participantes */}
      <div 
        className='d-flex justify-content-center'  
      >
        <button 
          type='button' 
          className='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#modalImportStudents'
          style={{display: (params.type === 'Comunidad' ? 'none': 'flex')}}
        >
            Importar Lista de {params.type === 'Comunidad' ? 'Miembros de Comunidad': params.type}
          </button>
          <PlusButton 
          type={'NewParticipant'} 
          font='20px' 
          />
      </div>
      <NewParticipant participant={params.type} community={community} />
      <ImportParticipants type={params.type} />
    </>
  )
}