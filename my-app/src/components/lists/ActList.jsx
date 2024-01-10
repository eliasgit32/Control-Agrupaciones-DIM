import React from 'react';
import ActCard from '../ActCard';
import '../../stylesheets/ActList.css';

export default function ActList(props) {
  const {groupID, selectedTerm, data,} =  props;

  if (data === '') return <div style={{color: '#343434'}}>No se encuentran registros</div>

  return(
    <div className='act-container'>
      <div className='container card-group d-flex flex-column align-content-center flex-wrap'>
        {data.map((activity) => {
          if (activity.asignado)
            return( 
              <ActCard
                key={activity.id}
                name={activity.nombre}
                description={activity.descripcion}
                start={activity.fechaInicio}
                end={activity.fechaFin}
                groupID={groupID}
                selectedTerm={selectedTerm}
                id={activity.id}
              />
            )
          return <div key={activity.id}></div>
        })}
        
      </div>
    </div>
  )
}