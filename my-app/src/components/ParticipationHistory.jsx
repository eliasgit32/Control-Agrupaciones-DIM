import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getParticipationHistory } from '../API/participations';
import { format } from 'date-fns';
import TermSelect from './TermSelect';
import { useState } from 'react';

export default function ParticipationHistory(props) {
  const { cedula } = props;

  const [startTerm, setStartTerm] = useState('2024-15');
  const [endTerm, setEndTerm] = useState('2024-15');
  
  const { isLoading, data } = useQuery(['history', cedula, startTerm, endTerm], 
  () => getParticipationHistory(cedula, startTerm, endTerm));

  if (isLoading) return <div>Cargando...</div>

  console.log(data);

  return (
    <>
      {/* Contenedor de selectores de periodos */}
      <div className='term-container'>
        <div className='text-center justify-content-center row mt-4'>
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
      <div className='accordion accordion-flush' id="accordionFlush">
        {data.map((group) => {
          return (
            <div className='accordion-item' key={group.idAgrupacion}>
              <h2 className='accordion-header'>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${group.idAgrupacion}`} aria-expanded="false" aria-controls="flush-collapseOne">
                  {group.nombreAgrupacion}
                </button>
              </h2>
              <div id={`flush-collapse${group.idAgrupacion}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className='accordion-body'>
                  {group.actividades.map((activity) => {
                    return (
                      <div key={`${activity.id} ${activity.periodo}`} className='row' style={{ justifyContent: 'space-around' }}>
                        <div className='col'>
                          {activity.periodo}
                        </div>
                        <div className='col'>
                          {activity.fechaInicio ? format(new Date(activity.fechaInicio), 'dd/MM/yyyy') : 'N/A'}
                        </div>
                        <div className='col'>
                          {activity.fechaFin ? format(new Date(activity.fechaFin), 'dd/MM/yyyy') : 'N/A'}
                        </div>
                        <Link to={`/group/${group.idAgrupacion}/${activity.id}/${activity.periodo}`} className='m-0 col'>
                          {activity.nombre}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>

  )
}