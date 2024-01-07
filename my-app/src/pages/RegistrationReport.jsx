import React from 'react';
import NavBar from '../components/NavBar';
import TermSelect from '../components/TermSelect';
import { useState } from 'react';
import TableTotalRegistrations from '../components/tables/TableTotalRegistrations';
import TableStatisticsRegistration from '../components/tables/TableStatisticsRegistration';
import { useQuery } from '@tanstack/react-query';
import { getSemesterStats, getTotalRegistrations } from '../API/reports';

export default function RegistrationReport() {
  const [startTerm, setStartTerm] = useState('2024-15');
  const [endTerm, setEndTerm] = useState('2024-15');

  // Hook de react query para solicitar los datos
  const TotalRegistrations =  useQuery(['TotalRegistrations', startTerm, endTerm],
  () => getTotalRegistrations(startTerm, endTerm));

  const SemesterStats = useQuery(['SemesterStats', startTerm, endTerm],
  () => getSemesterStats(startTerm, endTerm));

  if (TotalRegistrations.isLoading || SemesterStats.isLoading) {
    return (
      <>
        <NavBar />
        <div>Cargando...</div>
      </>
    )
  }
  
  return(
    <>
      <NavBar />
      <div className='title-container text-center mb-4' style={{color: '#343434'}}>
        <h2>Reporte de inscripciones</h2>
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
        <TableTotalRegistrations 
          data={TotalRegistrations.data}  
        />
      </div>

      {/*Tabla de datos del rendimiento por semestre de todas las participaciones*/}
      <div className='statistic-container my-5 mx-4'>
        <TableStatisticsRegistration data={SemesterStats.data} />
      </div>
    </>
  )
}