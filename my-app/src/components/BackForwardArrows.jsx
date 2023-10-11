import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackForwardArrows() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return(
    <div className='ms-5'>
      <i 
        className="bi bi-arrow-left-square" 
        onClick={goBack} 
        style={{fontSize: '2rem', cursor: 'pointer'}}
      ></i>
      <i 
        className="bi bi-arrow-right-square" 
        onClick={goForward} 
        style={{fontSize: '2rem', cursor: 'pointer'}}
      ></i>
    </div>
  )
}