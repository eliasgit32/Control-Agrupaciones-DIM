import React from 'react';
import '../stylesheets/PlusButton.css'

export default function PlusButton() {
  return(
    <div className='bs-component position-fixed bottom-0 end-0 px-5 py-3'>
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