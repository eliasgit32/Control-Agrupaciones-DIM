import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCoordinatorsNames } from '../API/coordinator';

export default function CoordinatorList() {
  const {isLoading, data} = useQuery(['coordinatorsNames'], getCoordinatorsNames)

  if (isLoading) {
    return <option>Cargando...</option>
  }

  // Si no hay coordinadores registrados en la bd
  if (data === '') {
    return <option>No data</option>
  }

  return(
    <>
      {data.map((coordinator) => {
        return <option 
          key={coordinator.cedula}
          value={coordinator.cedula}
        >
          {`${coordinator.primerApellido}, ${coordinator.primerNombre}`}
        </option>
      })}
    </>
  )
}