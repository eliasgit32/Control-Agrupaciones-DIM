import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '../../API/groups';
import GroupCard from '../GroupCard';

export default function GroupList() {
  const { isLoading, data } = useQuery(['groups'], getGroups);

  if (isLoading) {
    return <div style={{color: '#343434'}}>Cargando...</div>;
  }

  // Si no hay grupos registrados en la bd
  if (data === '') {
    return <div>No data</div>
  }

  return (
    <div className='container'>
      <div className='container card-group d-flex flex-row justify-content-start flex-wrap'>
        {data.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.nombre}
            description={group.descripcion}
            publico={group.publico}
            term={group.periodoActual}
          />
        ))}
      </div>
    </div>
  );
}