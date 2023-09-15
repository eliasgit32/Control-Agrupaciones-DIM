import React from 'react';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import PlusButton from '../components/PlusButton';
import NewGroup from '../components/NewGroup';
import GroupList from '../components/GroupList';

export default function HomePage() {
  //Estilo del botón añadir grupo
  const buttonStyle = 'position-fixed bottom-0 end-0 px-5 py-3'

  return (
    <>
      <NavBar />
      <div className='container'>
        <PageHeader pageTitle='Agrupaciones' />
        <GroupList />
        <PlusButton type='Group' styleClass={buttonStyle} font='50px'/>
        <NewGroup />
      </div>
    </>
  );
}
 