import React from 'react';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import PlusButton from '../components/PlusButton';
import NewGroup from '../components/NewGroup';
import GroupList from '../components/GroupList';

export default function HomePage() {

  return (
    <>
      <NavBar />
      <div className='container'>
        <PageHeader pageTitle='Agrupaciones' />
        <GroupList />
        <PlusButton />
        <NewGroup />
      </div>
    </>
  );
}
 