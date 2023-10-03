import React from 'react';
import { useState } from 'react';
import TermSelect from './TermSelect';
import ActList from './ActList';
import PlusButton from './PlusButton';
import AddActivity from './Modals/AddActivity';
import NewActivity from './Modals/NewActivity';
import SignUpParticipants from './Modals/SignUpParticipants';
import { useQuery } from '@tanstack/react-query';
import { getGroupActivities } from '../API/activities';

export default function ActivitiesContainer(props) {
  
  const[selectedTerm, setSelectedTerm] = useState('2024-15');

  const {group} =  props;

  //Query solicitar actividades de agrupación
  const {isLoading, data} =  useQuery(['activities', group.id, selectedTerm], 
    () => getGroupActivities(group.id, selectedTerm));

  // useEffect(() => {
  //   const NewRowsSelected = data.map((row, index) => {
  //     if (row.asignado === 1) {
  //       return index;
  //     }
  //     return null;
  //   }).filter((index) => index !== null);

  //   setRowsSelected(NewRowsSelected);
  // }, [data])

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
      <ActList groupID={group.id} data={data} />

      {/* Botones opciones de agrupación */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button 
        type='button' 
        className='btn btn-success'
        data-bs-toggle='modal'
        data-bs-target='#modalSignUpParticipants'>
          Inscribir Participantes
        </button>
        <button type='button' className='btn btn-info'>Exportar Cronograma Actividades</button>
        <PlusButton 
        type='AddActivity' 
        font='17px' 
        styleClass=''/>
      </div>

      {/* Modal de nueva actividad */}
      <AddActivity selectedTerm={selectedTerm} groupID={group.id} data={data} />
      <NewActivity groupName={group.nombre} groupID={group.id}/>
      {/* Modal de inscribir participante */}
      <SignUpParticipants />
    </div>
  )
}