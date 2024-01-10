import React from 'react';
import BarChart from '../components/BarChart';
import NavBar from '../components/NavBar';
import LineChart from '../components/LineChart';
import { useState } from 'react';
import TermSelect from '../components/TermSelect';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBarChartData, getLineChartData } from '../API/reports';

export default function ChartsReport() {
  const [startTerm, setStartTerm] = useState('2024-15');
  const [endTerm, setEndTerm] = useState('2024-15');

  const params =  useParams();

  const BarChartQuery = useQuery(['BarChart', params.groupID, startTerm, endTerm],
  () => getBarChartData(params.groupID, startTerm, endTerm));

  const LineChartQuery = useQuery(['LineChart', params.groupID, startTerm, endTerm],
  () => getLineChartData(params.groupID, startTerm, endTerm));

  if (BarChartQuery.isLoading || LineChartQuery.isLoading) {
    return (
      <>
        <NavBar />
        <div style={{color: '#343434'}}>Cargando...</div>
      </>
    )
  }

  // Si la agrupación no tiene estudiantes inscritos en los períodos
  // académicos seleccionados no muestra ningún gráfico
  if (BarChartQuery.data.inscritos.length === 0 ) {
    return (
      <>
        <NavBar />
        <div className='title-container text-center mb-4'>
        <h2 className='mb-3'>{`Gráfica de participación de ${BarChartQuery.data.agrupacion}`}</h2>
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

      <h4 className='text-center mt-5'>
        No se tienen participantes inscritos en el período de tiempo seleccionado
      </h4>
      </>
    )
  }

  return(
    <>
      <NavBar />

      <div className='title-container text-center mb-4'>
        <h2 className='mb-3' style={{color: '#343434'}}>
          {`Gráfica de participación de ${BarChartQuery.data.agrupacion}`}
        </h2>
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

      {/* Contenedor de gráfico de barras */}
      <div className='row' style={{width: '100%'}}>
        <div
          className='col d-flex justify-content-center my-5 mx-5'
          style={{ width: '1000px' }}
        >
          <BarChart
            labels={BarChartQuery.data.comunidades}
            registration={BarChartQuery.data.inscritos}
            participation={BarChartQuery.data.participantes}
          />
        </div>
      </div>
      
      {/* Contenedor de gráfico de líneas */}
      <div className='row' style={{width: '100%'}}>
        <div
          className='col d-flex justify-content-center my-4 mx-5'
          style={{ width: '1000px' }}
        >
          <LineChart 
            labels={LineChartQuery.data.periodos}
            registration={LineChartQuery.data.inscritos}
            participation={LineChartQuery.data.participantes}
          />
        </div>
      </div>
      
    </>
  )
}