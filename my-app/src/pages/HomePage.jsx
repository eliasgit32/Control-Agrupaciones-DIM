import React from 'react';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import PlusButton from '../components/PlusButton';
import NewGroup from '../components/modals/NewGroup';
import GroupList from '../components/lists/GroupList';
import { Link } from 'react-router-dom';

export default function HomePage() {
  //Estilo del botón añadir grupo
  const buttonStyle = 'position-fixed bottom-0 end-0 px-5 py-3'

  return (
    <>
      <NavBar />
      <div className='container'>
        <PageHeader pageTitle='Público/Agrupaciones' />
        <GroupList />
        <PlusButton type='NewGroup' styleClass={buttonStyle} font='50px'/>
        <NewGroup />
      </div>
      <Link to={'/RegistrationReport'}>
        <button 
          type='button' 
          className='position-fixed bottom-0 py-3 mb-3 btn btn-info'
          style={{left: '50%', transform: 'translateX(-50%)'}}
        >
          Reporte Inscripción en Agrupaciones
        </button>
      </Link>
      
    </>
  );
}
 