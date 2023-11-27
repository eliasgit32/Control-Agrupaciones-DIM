import react from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPersonalDIM } from '../../API/participants';

export default function PersonalDIMList() {
  const { isLoading, data } =  useQuery(['PersonalDIM'], getPersonalDIM);

  if (isLoading) {
    return <option>Cargando...</option>
  }

  return(
    <>
      <option value={0}>N/A</option>
      {data.map((personal) => {
        return <option 
          key={personal.cedula}
          value={personal.cedula}
        >
          {personal.nombreCompleto}
        </option>
      })}
    </>
  )

}