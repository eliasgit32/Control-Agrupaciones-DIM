import React from 'react';
import NavBar from '../components/NavBar';
import TableAllParticipants from '../components/tables/TableAllParticipants';
import PlusButton from '../components/PlusButton';
import { useParams } from 'react-router-dom';
import NewParticipant from '../components/modals/NewParticipant';
import { getComunnityMembers, getPersonal, getStudents } from '../API/participants';
import { useQuery } from '@tanstack/react-query';
import ImportStudents from '../components/modals/ImportStudents';

export default function RegParticipant() {
  const params = useParams();

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

  // switch(params.type) {
  //   case 'Estudiante': getFunction = getStudents; break;
  //   case 'Docente': break; //Caso participante tipo personal
  //   default: //Caso de participante tipo comunidad
  // }

  const { isLoading, data } = useQuery(['getParticipants', community], getFunction);

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
          className='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#modalImportStudents'
        >
            Importar Lista de {params.type === 'Comunidad' ? 'Miembros de Comunidad': params.type}
          </button>
          <PlusButton 
          type={'NewParticipant'} 
          font='20px' 
          />
      </div>
      <NewParticipant participant={params.type} community={community} />
      <ImportStudents />
    </>
  )
}