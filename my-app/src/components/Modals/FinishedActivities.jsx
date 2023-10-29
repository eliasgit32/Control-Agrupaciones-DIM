import React from 'react';
import TableFinishedAct from '../tables/TableFinishedAct';

export default function FinishedActivities(props) {

  const { data } =  props;

  return(
    <div className='modal modal-lg fade' id='modalFinishedActivities' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Actividades Finalizadas</h5>
            <button 
              type='button' 
              className='btn-close' 
              data-bs-dismiss='modal' 
              aria-label='Close'
            >
            </button>
          </div>
          <div className='modal-body'>
            {/* tabla de actividades finalizadas */}
            <TableFinishedAct data={data}/>
          </div>
        </div>
      </div>
    </div>
  )
}