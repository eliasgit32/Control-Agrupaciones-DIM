import React from 'react';
import { Link } from 'react-router-dom';

export default function ParticipationHistory() {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            PLIUL
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 1</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 2</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 3</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-check2 mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-25   Encuentro 1</p></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Pazando
          </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 1</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 2</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 3</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i className="bi bi-check2 mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-25   Encuentro 1</p></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}