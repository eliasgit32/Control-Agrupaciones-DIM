import React from 'react';

export default function ConfirmOperation(props) {

  const { operation, modalVisible, setModalVisible } = props;

  const handleDelete = () => {
    operation();
    setModalVisible(false);
  }

  return (
    <div className={`modal fade ${modalVisible ? 'show' : ''}`} 
      id='modalConfirmOperation' 
      aria-hidden='true' 
      tabIndex='-1'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-body'>
            <h5>
              ¿Está seguro que desea eliminar inscripción de participante?
              La operación también eliminará toda participación realizada
              por la persona en las actividades de la agrupación.
            </h5>
            <button
              type='button'
              className='btn btn-danger'
              data-bs-toggle='modal'
              data-bs-target='#modalSignUpParticipants'
              data-bs-dismiss='modal'
              onClick={() => setModalVisible(false)}
            >
              Cancelar
            </button>
            <button
              type='button'
              className='btn btn-success'
              data-bs-toggle='modal'
              data-bs-target='#modalSignUpParticipants'
              data-bs-dismiss='modal'
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