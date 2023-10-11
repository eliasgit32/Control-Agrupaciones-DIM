import React from 'react';
import ActCard from '../ActCard';
import '../../stylesheets/ActList.css';
// import { useQuery } from '@tanstack/react-query';
// import { getGroupActivities } from '../API/activities';

export default function ActList(props) {
  const {groupID, selectedTerm, data,} =  props;
  

  // const {isLoading, data} = useQuery(['activities', groupID, selectedTerm],
  // () => getGroupActivities(groupID, selectedTerm));

  // if( isLoading) return <div>Cargando...</div>;

  if (data === '') return <div>No se encuentran registros</div>

  return(
    <div className='act-container'>
      <div className='container card-group d-flex flex-column align-content-center flex-wrap'>
        {data.map((activity) => {
          if (activity.asignado)
            return( 
              <ActCard
                key={activity.id}
                name={activity.nombre}
                description={activity.descripcion}
                start={activity.fechaInicio}
                end={activity.fechaFin}
                groupID={groupID}
                selectedTerm={selectedTerm}
                id={activity.id}
              />
            )
          return <div key={activity.id}></div>
        })}
        
      </div>
    </div>
  )
}