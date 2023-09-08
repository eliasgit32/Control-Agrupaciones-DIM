import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroups } from '../API/group';
import GroupCard from './GroupCard';

export default function GroupList() {
  
const { isLoading, data } = useQuery(['groups'], getGroups);

if (isLoading) {
  return <div>Cargando...</div>;
}

return (
  <div className='container'>
    <div className='container card-group d-flex flex-row justify-content-start flex-wrap'>
      {data.map((group) => (
        <GroupCard 
        key={group.id}
        name={group.nombre}
        description={group.descripcion}
        publico={group.publico} 
        />
      ))}
    </div>
  </div>
    
  
);

}