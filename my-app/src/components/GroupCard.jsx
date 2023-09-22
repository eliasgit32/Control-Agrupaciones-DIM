import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/GroupCard.css'

export default function GroupCard(props) {
  const handleButtonClick = () => {
    props.setSelectedGroup(props.id)
  }
  //Estado del mouse sobre el componente
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = () => {
    setHover(false);
  }

  return(
    <div className='bs-component col-md-4'>
      <div 
      className={`card border-${hover ? 'primary' : 'secondary'} my-3 mx-3`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      style={{width: '18rem'}}>
        <div className='card-header text-info'>{props.publico}</div>
        <div className='card-body'>
          <Link to={`/group/${props.id}`} className='link'>
            <h4 className='card-title'>{props.name}</h4>
            <p 
            className='card-text' >
              {props.description}
            </p>
          </Link>
          <div className='text-center'>
            <button
              data-bs-toggle='modal' 
              data-bs-target='#modalNewGraph'
              className='btn btn-primary'
              onClick={handleButtonClick} >
                Generar gráfica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}