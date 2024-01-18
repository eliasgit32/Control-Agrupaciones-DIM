import React from 'react';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import PlusButton from '../components/PlusButton';
import NewGroup from '../components/modals/NewGroup';
import GroupList from '../components/lists/GroupList';
import { Link } from 'react-router-dom';
import ActNotification from '../components/ActNotification';
import FinishedActivities from '../components/modals/FinishedActivities';
import { useQuery } from '@tanstack/react-query';
import { getFinishedAct } from '../API/activities';

export default function HomePage() {
  //Estilo del botón añadir grupo
  const buttonStyle = 'position-fixed bottom-0 end-0 px-5 py-3'

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Los meses comienzan en 0
    const day = currentDate.getDate();
    
    return(`${year}-${month}-${day}`);
  }

  //Hook de react query para solicitar actividades finalizadas
  const { isLoading, data } = useQuery(['finishedAct'], () => getFinishedAct(getCurrentDate()));
  
  //Hook para notificar actividades sin participaciones registradas
  var showNotification =  ''; 


  if (isLoading) {
    return <div style={{color: '#343434'}}>Cargando...</div>;
  }

  if (data.length > 0) showNotification = 'show';

  return (
    <>
      <NavBar />
      <div className='container'>
        <PageHeader pageTitle='Público/Agrupaciones' />
        <GroupList />
        <PlusButton type='NewGroup' styleClass={buttonStyle} font='50px'/>
        <NewGroup />

      </div>

      {/* Notificación de actividades sin participación */}
      <ActNotification show={showNotification} />
      {/* Modal lista de actividades finalizadas */}
      <FinishedActivities data={data} />

      {/* Botón que redirige a reporte de inscritos */}
      <Link to={'/RegistrationReport'}>
        <button 
          type='button' 
          className='position-fixed bottom-0 py-3 mb-3 btn'
          style={{left: '50%', transform: 'translateX(-50%)', background: '#40b4e5'}}
        >
          Reporte Inscripción en Agrupaciones
        </button>
      </Link>
      
    </>
  );
}
 