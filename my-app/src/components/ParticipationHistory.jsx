import React from 'react';
import { Link } from 'react-router-dom';

export default function ParticipationHistory() {
  return (
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            PLIUL
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 1</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 2</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 3</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-check2 mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-25   Encuentro 1</p></Link>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Pazando
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 1</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 2</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-x mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-15   Encuentro 3</p></Link>
            </div>
            <div className='d-flex align-items-center'>
              <i class="bi bi-check2 mx-2"></i>
              <Link to={'/group/1/1'}><p className='m-0'>2024-25   Encuentro 1</p></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}