import React from 'react';
import { useState } from 'react';

export default function ActCard(props) {
  //Estado del mouse sobre el componente
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = () => {
    setHover(false);
  }

  return (
    <div className='bs-component'>
      <div className={`card border-${hover ? 'primary' : 'secondary'} mb-3`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '700px' }}>
        <div className='card-header'>{`${props.start} - ${props.end}`}
        </div>
        <div className='card-body'>
          <h4 className='card-title'>{props.name}</h4>
          <p className='card-text'>{props.description}</p>
        </div>
      </div>
    </div>
      
  )
}