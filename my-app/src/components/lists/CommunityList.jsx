import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExternalCommunities, getFaculties, getUnitsFaculties } from '../../API/communities';

export default function CommunityList(props) {
  var getFunction = null;

  switch(props.type) {
    case 'Escuela/Unidad': getFunction = getUnitsFaculties; break;
    case 'Escuela': getFunction = getFaculties; break;
    default: getFunction = getExternalCommunities; break;
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
      <option value={'N/A'}>Seleccione Comunidad</option>
      {data.map((community) => {
        return <option 
          key={community.nombre}
          value={community.nombre}
        >
          {community.nombre}
        </option>
      })}
    </>
  )
}