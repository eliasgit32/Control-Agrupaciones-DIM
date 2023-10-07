import React from 'react';
import TermSelect from './TermSelect';
import TableParticipants from './Tables/TableParticipants';
import { useQuery } from '@tanstack/react-query';
import { getParticipations } from '../API/participations';


export default function ParticipationContainer(props) {
  const {selectedTerm, setSelectedTerm, groupID, activityID} = props;

  //Query solicitar participantes de la agrupación
  const {isLoading, data} = useQuery(['participations', groupID, selectedTerm, activityID],
    () => getParticipations(groupID, selectedTerm, activityID)
  )

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

      {/* Botones opciones de agrupación */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button type='button' className='btn btn-info'>Exportar Lista de Participantes</button>
      </div>
    </>
  )
}