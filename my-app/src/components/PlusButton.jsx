import React from 'react';
import '../stylesheets/PlusButton.css'

export default function PlusButton() {
  return(
    <div className='bs-component'>
      <button 
      type='button' 
      className='btn btn-primary' 
      aria-label='Add New'
      data-bs-toggle='modal'
      data-bs-target='#modalNewGroup'>
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}