import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUnitsFaculties } from '../API/communities';

export default function CommunityList(props) {
  var getFunction = null;

  switch(props.type) {
    case 'Escuela/Unidad': getFunction = getUnitsFaculties; break;
    default: //Aquí dejo el de las comunidades no universitarias
  }
  const {isLoading, data} = useQuery(['Communities'], getFunction);
  
  if (isLoading) {
    return <option>Cargando...</option>
  }

  // Si no hay comunidades registrados en la bd
  if (data === '') {
    return <option>No data</option>
  }

  return(
    <>
      {data.map((community) => {
        return <option 
          key={community.id}
          value={community.nombre}
        >
          {community.nombre}
        </option>
      })}
    </>
  )
}