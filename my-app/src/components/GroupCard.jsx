import React from 'react';
import { Link } from 'react-router-dom';

export default function GroupCard(props) {
  return(
    <div className='bs-component'>
      <div className='card border-secondary mb-3' style={{width: '18rem'}}>
        <div className='card-header text-info'>{props.publico}</div>
        <div className='card-body'>
          <h4 className='card-title'>{props.name}</h4>
          <p className='card-text'>{props.description}</p>
          <Link to={''} className='btn btn-primary' >Generar gráfica</Link>
        </div>
      </div>
    </div>
  );
}