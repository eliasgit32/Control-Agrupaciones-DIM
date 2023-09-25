import React, { useState } from 'react';
import CommunityList from '../CommunityList';

export default function NewParticipantUCAB(props) {
  //Inputs
  const[cedula, setCedula] = useState(null);
  const[fName, setFName] = useState(null);
  const[sName, setSName] = useState(null);
  const[fLastName, setFLastName] = useState(null);
  const[sLastName, setSLastName] = useState(null);
  const[birthdate, setBirthdate] = useState(null);
  const[type, setType] = useState(null);
  const[community, setCommunity] = useState(null);
  const[email, setEmail] = useState(null);
  const[tlp, setTlp] = useState(null);
  const[firstTerm, setFirstTerm] = useState(null);
  const[emailUCAB, setEmailUCAB] = useState(null);

    //Funciones del manejo de inputs
    const changeCedula = e => setCedula(e.target.value) 
    const changeFName = e => setFName(e.target.value)
    const changeSName = e => setSName(e.target.value)
    const changeFLastName = e => setFLastName(e.target.value)
    const changeSLastName = e => setSLastName(e.target.value) 
    const changeBirthdate = e => setBirthdate(e.target.value)
    const changeType = e => setType(e.target.value)
    const changeCommunity = e => setCommunity(e.target.value)
    const changeEmail = e => setEmail(e.target.value) 
    const changeTlp = e => setTlp(e.target.value)
    const changeFirstTerm = e => setFirstTerm(e.target.value)
    const changeEmailUCAB = e => setEmailUCAB(e.target.value)

  const handleClose = () => {

  }

  return(
    <div className='modal modal-lg fade' id='modalNewParticipantUCAB' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              Registrar {props.participant}
            </h5>
            <button 
            type='button' 
            className='btn-close' 
            data-bs-dismiss='modal' 
            aria-label='Close'
            onClick={handleClose}>  
            </button>
          </div>
          <div className='modal-body'>
            {/* Registrar cédula */}
            <div className='mb-3 row'>
              <label htmlFor="newParticipantCed" className='form-label col-sm-2'>Cédula</label>
              <div className='col-sm-4'>
                <input 
                  type="text"
                  id='newParticipantCed'
                  className='form-control'
                />
              </div>
            </div>
            {/* Nombres */}
            <div className='input-group mb-3'>
              <span className='input-group-text' part-field='true'> 
                1er y 2do Nombre
              </span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                part-field='true'
                onChange={changeFName}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                part-field='true'
                onChange={changeSName}
              />
            </div>
            {/* 1er y 2do apellido */}
            <div className='input-group mb-3'>
              <span className="input-group-text" part-field='true'>1er y 2do Apellido</span>
              <input
                type="text"
                className="form-control"
                part-field='true'
                onChange={changeFLastName}
              />
              <input
                type="text"
                className="form-control"
                part-field='true'
                onChange={changeSLastName}
              />
            </div>
            {/* Fecha nacimiento */}
            <div className='mb-3 row'>
              <label htmlFor='newUCABbirthdate'
                className='form-label col-sm-3 col align-self-center' part-field='true'>
                Fecha Nacimiento:
              </label>
              <div className='col-sm-3'>
                <input
                  type="date"
                  className='form-control'
                  id='newUCABbirthdate'
                  onChange={changeBirthdate}
                  defaultValue={new Date().toISOString().substr(0, 10)}
                />
              </div>
              {/* Escuela/Unidad */}
              <label htmlFor='newPartUCABCommunity'
                className='form-label col-sm-2 col align-self-center' part-field='true'>
                  Escuela/Unidad:
                </label>
              <div className='col-sm-3'>
                <select
                  className='form-select'
                  id="newPartUCABCommunity"
                  part-field='true'
                  onChange={changeCommunity}>
                  <CommunityList type='Escuela/Unidad'/>
                </select>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}