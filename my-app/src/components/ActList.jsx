import React from 'react';
import ActCard from './ActCard';
import '../stylesheets/ActList.css';

export default function ActList() {
  return(
    <div className='act-container'>
      <div className='container card-group d-flex flex-column align-content-center flex-wrap'>
        <ActCard 
        name='Actividad 1'
        description='Descripción de la actividad 1'
        start='25/09/2023'
        end='26/09/2023'
        groupID='1'
        id='1'/>
        <ActCard 
        name='Actividad 2'
        description='Descripción de la actividad 2'
        start='01/10/2023'
        end='01/10/2023'
        groupID='1'
        id='2'/>
        <ActCard 
        name='Actividad 3'
        description='Descripción de la actividad 3'
        start='05/10/2023'
        end='05/10/2023'
        groupID='1'
        id='3'/>
      </div>
    </div>
  )
}