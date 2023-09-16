import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/ActCard.css';

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
        <Link to = {`/group/${props.groupID}/${props.id}`} className='link'>
          <div className='card-header'>{`${props.start} - ${props.end}`}</div>
          <div className='card-body'>
            <h4 className='card-title'>{props.name}</h4>
            <p className='card-text'>{props.description}</p>
          </div>
        </Link>
        
      </div>
    </div>
      
  )
}