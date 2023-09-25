import React from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/TableAllParticipants';
import PlusButton from '../components/PlusButton';
import { useParams } from 'react-router-dom';
import NewParticipantUCAB from '../components/NewParticipantUCAB';

export default function RegParticipant() {
  const params = useParams();
  var community = '';
  var modalTarget = '';

  switch (params.type){
    case 'Comunidad': 
      community = 'Comunidad';
      modalTarget = 'Community'; 
      break;
    case 'Personal' : 
      community = 'Unidad';
      modalTarget = 'UCAB'; 
      break;
    default: 
    community = 'Escuela'; modalTarget = 'UCAB';
  }

  return(
    <>
      <NavBar />
      <div className='mx-3'> 
        <TableAllParticipants title={params.type} type={params.type} community={community} />
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
          type={'NewParticipant'+modalTarget} 
          font='20px' 
          />
      </div>
      <NewParticipantUCAB participant={params.type} />
    </>
  )
}