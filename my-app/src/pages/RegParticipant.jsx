import React from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/TableAllParticipants';
import PlusButton from '../components/PlusButton';

export default function RegParticipant(props) {
  return(
    <>
      <NavBar />
      <div className='mx-3'> 
        <TableAllParticipants community='Escuela' />
      </div>
      <div className='mb-4'></div>
      {/* Botones de registrar o importar participantes */}
      <div className='d-flex justify-content-center'>
        <button 
          type='button' 
          className='btn btn-success'>
            Importar Lista de {props.type}
          </button>
          <PlusButton 
          type='NewParticipantUCAB' 
          font='20px' 
          />
      </div>
    </>
  )
}