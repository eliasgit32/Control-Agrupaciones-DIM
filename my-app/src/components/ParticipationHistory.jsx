import React from 'react';
import { Link } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {getParticipationHistory} from '../API/participations';
import {format} from 'date-fns';
export default function ParticipationHistory(props) {
  const {cedula} =  props;

  const { isLoading, data } = useQuery(['history', cedula], () => getParticipationHistory(cedula));

  if(isLoading) return <div>Cargando...</div>

  console.log(data);

  return (
    <div className='accordion accordion-flush' id="accordionFlush">
      {data.map((group) => {
        return(
          <div className='accordion-item' key={group.idAgrupacion}>
            <h2 className='accordion-header'>
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${group.idAgrupacion}`} aria-expanded="false" aria-controls="flush-collapseOne">
                {group.nombreAgrupacion}
              </button>
            </h2>
            <div id={`flush-collapse${group.idAgrupacion}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className='accordion-body'>
                {group.actividades.map((activity) =>{
                  return(
                    <div key={`${activity.id} ${activity.periodo}`} className='row' style={{justifyContent: 'space-around'}}>
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
  )
}