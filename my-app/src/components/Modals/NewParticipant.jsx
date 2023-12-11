import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createParticipant } from '../../API/participants';
import CommunityList from '../lists/CommunityList';

export default function NewParticipant(props) {
  //Inputs
  const [cedula, setCedula] = useState('');
  const [firstNames, setFirstNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [type, setType] = useState(props.participant);
  const [community, setCommunity] = useState(0);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  // const[firstTerm, setFirstTerm] = useState(null);
  const [emailUCAB, setEmailUCAB] = useState('');

  //Funciones del manejo de inputs
  const changeCedula = e => setCedula(e.target.value)
  const changeFirstNames = e => setFirstNames(e.target.value)
  const changeLastNames = e => setLastNames(e.target.value)
  const changeType = e => setType(e.target.value)
  const changeCommunity = e => setCommunity(e.target.value)
  const changeEmail = e => setEmail(e.target.value)
  const changeTelephone = e => setTelephone(e.target.value)
  // const changeFirstTerm = e => setFirstTerm(e.target.value)
  const changeEmailUCAB = e => setEmailUCAB(e.target.value)

  const handleClose = () => {
    setCedula('');
    setFirstNames('');
    setLastNames('');
    setType(props.participant);
    // setCommunity(null);
    setEmail('');
    setTelephone('');
    setEmailUCAB('');
  }

  const queryClient = useQueryClient();

  //Hook de react query para enviar participante
  const addParticipantMutation = useMutation({
    mutationFn: createParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleClose();
    }
  })

  //Guardar Participante
  const handleSave = () => {
    const newParticipant = {
      cedula: cedula,
      firstNames: firstNames,
      lastNames: lastNames,
      type: type,
      community: community,
      phase: (props.participant === 'Estudiante' ? 'Familiarización' : null),
      email: email,
      telephone: telephone,
      emailInst: (props.participant === 'Comunidad' ? null : emailUCAB)
    }

    addParticipantMutation.mutate(newParticipant);
  }

  return (
    <div className='modal modal-lg fade' id='modalNewParticipant' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {props.participant === 'Comunidad' ? 'Registrar Miembro de Comunidad' : `Registrar ${props.participant}`}
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
              <label
                htmlFor="newParticipantCed"
                className='form-label col-sm-1 col align-self-center'
                style={{ fontSize: '16px' }}
              >
                Cédula
              </label>
              <div className='col-sm-4'>
                <input
                  type="text"
                  id='newParticipantCed'
                  className='form-control'
                  style={{ fontSize: '14px' }}
                  value={cedula}
                  onChange={changeCedula}
                />
              </div>
            </div>
            {/* Nombres y apellidos*/}
            <div className='input-group mb-3'>
              <span className='input-group-text' part-field='true'>
                Nombres y apellidos
              </span>
              <input
                type="text"
                aria-label="First name"
                className="form-control"
                part-field='true'
                value={firstNames}
                onChange={changeFirstNames}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                part-field='true'
                value={lastNames}
                onChange={changeLastNames}
              />
            </div>
            <div className='mb-3 row'>
              
              {/* Escuela/Unidad */}
              <label
                htmlFor='newPartCommunity'
                className={`form-label col-sm-2 col align-self-center`}
                part-field='true'
              >
                {props.community}
              </label>
              <div className='col-sm-3'>
                <select
                  className='form-select'
                  id="newPartCommunity"
                  part-field='true'
                  value={community}
                  onChange={changeCommunity}
                >
                  <CommunityList type={props.community} />
                </select>
              </div>
            </div>
            {/* Correo electrónico */}
            <div className='mb-3 row'>
              <label
                htmlFor="newParticipantEmail"
                className='form-label col-sm-2 col align-self-center'
                style={{ fontSize: '16px' }}
              >
                Correo
              </label>
              <div className='col-sm-4'>
                <input
                  type="email"
                  id='newParticipantEmail'
                  className='form-control'
                  style={{ fontSize: '14px' }}
                  value={email}
                  onChange={changeEmail}
                />
              </div>
              {/* Nro de teléfono */}
              <label
                htmlFor='newPartTelephone'
                className={`form-label col-sm-1 col align-self-center`}
                part-field='true'
              // style={{marginLeft: '70px'}}
              >
                Teléfono
              </label>
              <div className='col-sm-3'>
                <input
                  type="text"
                  id='newPartTelephone'
                  className='form-control'
                  style={{ fontSize: '14px' }}
                  value={telephone}
                  onChange={changeTelephone}
                />
              </div>
            </div>
            {/* Email Institucional */}
            <div className='mb-2 row' style={{ display: (props.participant === 'Comunidad' ? 'none' : 'flex') }}>
              <label
                htmlFor="newParticipantInstEmail"
                className='form-label col-sm-2 col align-self-center'
                style={{ fontSize: '16px' }}
              >
                Correo UCAB
              </label>
              <div className='col-sm-4'>
                <input
                  type="email"
                  id='newParticipantInstEmail'
                  className='form-control'
                  style={{ fontSize: '14px' }}
                  value={emailUCAB}
                  onChange={changeEmailUCAB}
                />
              </div>
              {/* Tipo de personal */}
              <label
                htmlFor="newPartPersonalType"
                className='form-label col-sm-2 col align-self-center'
                style={{ fontSize: '16px', padding: '0',
                  display: (props.participant !== 'Personal' ? 'none' : 'inline-block') }}
              >
                Tipo de Personal
              </label>
              <div 
                className='col-sm-3'
                style={{display: (props.participant !== 'Personal' ? 'none' : 'block')}}
              >
                <select
                  id="newPartPersonalType"
                  className='form-select'
                  part-field='true'
                  value={type}
                  onChange={changeType}
                >
                  <option value="Docentes Pregrado">Docentes Pregrado</option>
                  <option value="Profesionales">Profesionales</option>
                  <option value="Empleados">Empleados</option>
                </select>
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
              onClick={handleSave}>
              {props.participant === 'Comunidad' ? 'Guardar Miembro de Comunidad' : `Guardar ${props.participant}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}