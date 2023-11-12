import React from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/tables/TableAllParticipants';
import PlusButton from '../components/PlusButton';
import { useParams } from 'react-router-dom';
import NewParticipant from '../components/modals/NewParticipant';
import { getStudents } from '../API/participants';
import { useQuery } from '@tanstack/react-query';

export default function RegParticipant() {
  const params = useParams();

  var community = '';
  var getFunction = null;

  if(params.type === 'Comunidad') {
    community = 'Comunidad';
  } else if(params.type === 'Estudiante') {
    community = 'Escuela';
    getFunction = getStudents;
  } else {
    community = 'Escuela/Unidad'
  }

  // switch(params.type) {
  //   case 'Estudiante': getFunction = getStudents; break;
  //   case 'Docente': break; //Caso participante tipo personal
  //   default: //Caso de participante tipo comunidad
  // }

  const { isLoading, data } = useQuery(['getParticipants'], getFunction);

  if (isLoading) {
    return (
      <>
      <NavBar />
      <div>Cargando...</div>
      </>
    )
  } 

  return(
    <>
      <NavBar />
      <div className='mx-3'> 
        <TableAllParticipants type={params.type} community={community} data={data} />
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
      <NewParticipant participant={params.type} community={community} />
    </>
  )
}