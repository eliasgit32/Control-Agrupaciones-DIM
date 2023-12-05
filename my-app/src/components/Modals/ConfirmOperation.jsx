import React from 'react';

export default function ConfirmOperation(props) {

  const { operation, modalVisible, setModalVisible, selectedParticipant, type } = props;

  var confirmationMsg = '';

  if (type === 'SignUp') {
    confirmationMsg = `¿Está seguro que desea eliminar inscripción de participante?
    La operación también eliminará toda participación realizada
    por el portador de la cédula ${selectedParticipant} en las actividades de la agrupación.`
  } else if (type === 'deleteParticipant') {
    confirmationMsg = `¿Desea eliminar al participante portador de la cédula ${selectedParticipant} 
    del sistema? Se eliminarán todas sus participaciones e inscripciones realizadas en las agrupaciones`
  } else {
    confirmationMsg = `Se desasignará el portador de la cédula ${selectedParticipant} como acompañante 
    de la actividad`
  }

  const handleDelete = () => {
    operation();
    setModalVisible(false);
  }

  return (
    <div className={`modal fade ${modalVisible ? 'show' : ''}`} 
    style={{ display: modalVisible ? 'block' : 'none' }}  
    id='modalConfirmOperation' 
      aria-hidden='true' 
      tabIndex='-1'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-body'>
            <h5>
              {confirmationMsg}
            </h5>
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => setModalVisible(false)}
            >
              Cancelar
            </button>
            <button
              type='button'
              className='btn btn-success'
              onClick={handleDelete}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}