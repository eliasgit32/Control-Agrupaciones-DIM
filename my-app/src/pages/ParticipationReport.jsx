import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function ParticipationReport() {
  const params = useParams();
  
  return(
    <>
      <NavBar />
      <div>Reporte de participaciones de la agrupación {params.groupID}</div>
    </>
  )
}