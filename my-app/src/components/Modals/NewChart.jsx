import React from 'react';
import { useNavigate } from 'react-router-dom';
import TermSelect from '../TermSelect';

export default function NewChart(props) {
  const navigate = useNavigate();

  const handleClose = () => {

  }

  const handleGenerate= () => {
    navigate('/ChartsReport')
  }
  
  return(
    <div className='modal fade' id='modalNewGraph' aria-hidden='true' tabIndex='-1'>
      <div className=' modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Gráfica de Participación</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'>
            <div className='d-flex justify-content-space-around mb-2'>
              <label className='form-label'>Período Inicial</label>
              <div className='InitialTerm col-sm-6'>
                <TermSelect />
              </div>
            </div>
            <div className='d-flex justify-content-space-around'>
              <label className='form-label'>Período Final</label>
              <div className='FinalTerm col-sm-6'>
                <TermSelect />
              </div>
            </div>
            
          </div>
          <div className='modal-footer'>
          <button 
            type='button' 
            className='btn btn-danger' 
            data-bs-dismiss='modal'
            onClick={handleClose}>Cancelar</button>
            <button 
              type='button' 
              className='btn btn-success'
              data-bs-dismiss='modal'
              onClick={handleGenerate}>
                Generar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}