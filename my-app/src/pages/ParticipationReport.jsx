import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TermSelect from '../components/TermSelect';
import { useState } from 'react';
import TableParticipationsGroup from '../components/tables/TableParticipationsGroup';
import TableStatisticsActivities from '../components/tables/TableStatisticsActivities';
import { useQuery } from '@tanstack/react-query';
import { getAllParticipations, getParticipationsStats } from '../API/participations';

export default function ParticipationReport() {
  const params = useParams();
  const [startTerm, setStartTerm] = useState('2024-15');
  const [endTerm, setEndTerm] = useState('2024-15');

  //Hook de react query para solicitar los datos
  const AllParticipationsQuery = useQuery(['AllParticipations', params.groupID, startTerm, endTerm],
  () => getAllParticipations(params.groupID, startTerm, endTerm));

  const ParticipationsStatsQuery = useQuery(['ParticipationsStats', params.groupID, startTerm, endTerm],
  () => getParticipationsStats(params.groupID, startTerm, endTerm));

  if (AllParticipationsQuery.isLoading || ParticipationsStatsQuery.isLoading) {
    return(
      <>
        <NavBar />
        <div>
          Cargando...
        </div>
      </>
    )
  }

  return(
    <div>
      <NavBar />
      <div className='title-container text-center mb-4'>
        <h2>Reporte de participaciones de la agrupación {AllParticipationsQuery.data.nombreAgrupacion}</h2>
      </div>

      {/* Contenedor de selectores de periodos */}
      <div className='px-5' style={{marginTop: '35px'}}>
        <div className='text-center justify-content-center row my-4'>
          <label className='form-label col-sm-2'>Desde</label>
          <div className='col-sm-4'>
            <TermSelect selectedTerm={startTerm} setSelectedTerm={setStartTerm} />
          </div>
          <label className='form-label col-sm-2'>Hasta</label>
          <div className='col-sm-4'>
            <TermSelect selectedTerm={endTerm} setSelectedTerm={setEndTerm} />
          </div>
        </div>
      </div>

      <div className='table-container my-3 mx-4'>
        <TableParticipationsGroup 
          data={AllParticipationsQuery.data.actividades} 
          groupID={params.groupID} 
        />
      </div>

      {/*Tabla que contiene las estadísticas de cada actividad */}
      <div className='statistic-container my-5 mx-4'>
        <TableStatisticsActivities data={ParticipationsStatsQuery.data} />
      </div>
    </div>
  )
}