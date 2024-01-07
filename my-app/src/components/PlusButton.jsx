import React from 'react';

export default function PlusButton(props) {
  const fontSize = {fontSize: props.font};
  const iconStyle = {transform: 'scale(2.5)'};
  return(
    <div className={props.styleClass} >
      <button
        type='button'
        className='btn'
        style={{background: '#787878'}}
        aria-label='Add New'
        data-bs-toggle='modal'
        data-bs-target={`#modal${props.type}`}>
        <i className="bi bi-plus" style={{...fontSize, ...iconStyle}}></i>
      </button>
    </div>
    
  );
}