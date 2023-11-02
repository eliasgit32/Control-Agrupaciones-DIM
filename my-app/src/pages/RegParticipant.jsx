import React from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/tables/TableAllParticipants';
import PlusButton from '../components/PlusButton';
import { useParams } from 'react-router-dom';
import NewParticipantUCAB from '../components/modals/NewParticipantUCAB';

export default function RegParticipant() {
  const params = useParams();
  var community = '';

  if(params.type === 'Comunidad') {
    community = 'Comunidad';
  } else if(params.type === 'Estudiante') {
    community = 'Escuela';
  } else {
    community = 'Escuela/Unidad'
  }

  return(
    <>
      <NavBar />
      <div className='mx-3'> 
        <TableAllParticipants type={params.type} community={community} />
      </div>
      <div className='mb-4'></div>
      {/* Botones de registrar o importar participantes */}
      <div className='d-flex justify-content-center'>
        <button 
          type='button' 
          className='btn btn-success'>
            Importar Lista de {params.type === 'Comunidad' ? 'Miembros de Comunidad': params.type}
          </button>
          <PlusButton 
          type={'NewParticipant'} 
          font='20px' 
          />
      </div>
      <NewParticipantUCAB participant={params.type} community={community} />
    </>
  )
}