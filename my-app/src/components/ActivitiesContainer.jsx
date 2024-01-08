import React from 'react';
import { useState } from 'react';
import TermSelect from './TermSelect';
import ActList from './lists/ActList';
import PlusButton from './PlusButton';
import AddActivity from './modals/AddActivity';
import NewActivity from './modals/NewActivity';
import AddParticipants from './modals/AddParticipants';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getGroupActivities } from '../API/activities';
import ConfirmOperation from './modals/ConfirmOperation';
import { deleteGroupRegistration } from '../API/participants';
import { Link } from 'react-router-dom';

export default function ActivitiesContainer(props) {
  
  const {group, selectedTerm, setSelectedTerm} =  props;
  
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalVisible, setModalVisible] =  useState(false);
  
  const queryClient = useQueryClient();
  
  //Mutación borrar inscripción
  const deleteResgitrationMutation =  useMutation({
    mutationFn: deleteGroupRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  //Query solicitar actividades de agrupación
  const {isLoading, data} =  useQuery(['activities', group.id, selectedTerm], 
    () => getGroupActivities(group.id, selectedTerm));

  if (isLoading) return <div>Cargando...</div>

  return(
    <div>
      {/* Select de períodos académicos */}
      <div className='term-container'>
        <div className='text-center justify-content-center row mt-4'>
          <label htmlFor="selectTerms" className='form-label col-sm-2'>Períodos</label>
          <div className='col-sm-4'>
            <TermSelect setSelectedTerm={setSelectedTerm} selectedTerm={selectedTerm} />
          </div>
        </div>
      </div>

      {/* Lista de Actividades de la agrupación */}
      <ActList groupID={group.id} data={data} selectedTerm={selectedTerm} />

      {/* Botones opciones de agrupación */}
      <div 
        className='buttons-container text-center d-flex justify-content-center'
        style={{background: '#cdcdcd'}}  
      >
        <button 
        type='button' 
        className='btn btn-success'
        data-bs-toggle='modal'
        data-bs-target='#modalAddParticipants'>
          Inscribir Participantes
        </button>
        <Link to={`/ParticipationReport/${group.id}`}>
          <button type='button' className='btn btn-info'>
            Reporte Participación en Actividades
          </button>
        </Link>
        
        <PlusButton 
        type='AddActivity' 
        font='17px' 
        styleClass=''/>
      </div>

      {/* Modal de nueva actividad */}
      <AddActivity selectedTerm={selectedTerm} groupID={group.id} data={data} />
      <NewActivity groupName={group.nombre} groupID={group.id}/>
      {/* Modal de inscribir participante/Agregar acompañantes */}
      <AddParticipants 
        selectedTerm={selectedTerm} 
        groupID={group.id} 
        setSelectedParticipant={setSelectedParticipant} 
        setModalVisible={setModalVisible}
        type='SignUp'
      />
      <ConfirmOperation 
        operation={() => 
          {
            deleteResgitrationMutation.mutate({cedula: selectedParticipant, groupID: group.id, term: selectedTerm})
          }
        }
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedParticipant={selectedParticipant}
        type='SignUp'
      />
      
    </div>
  )
}