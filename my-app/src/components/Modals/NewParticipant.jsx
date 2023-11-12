import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createParticipant } from '../../API/participants';
import CommunityList from '../lists/CommunityList';

export default function NewParticipant(props) {
  //Inputs
  const [cedula, setCedula] = useState('');
  const [fName, setFName] = useState('');
  const [sName, setSName] = useState('');
  const [fLastName, setFLastName] = useState('');
  const [sLastName, setSLastName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date().toISOString().substr(0, 10));
  const [type, setType] = useState(props.participant);
  const [community, setCommunity] = useState(0);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  // const[firstTerm, setFirstTerm] = useState(null);
  const [emailUCAB, setEmailUCAB] = useState('');

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
  const changeTelephone = e => setTelephone(e.target.value)
  // const changeFirstTerm = e => setFirstTerm(e.target.value)
  const changeEmailUCAB = e => setEmailUCAB(e.target.value)

  const handleClose = () => {
    setCedula('');
    setFName('');
    setSName('');
    setFLastName('');
    setSLastName('');
    setBirthdate(new Date().toISOString().substr(0, 10));
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
      firstName: fName,
      secondName: sName,
      firstLastName: fLastName,
      secondLastName: sLastName,
      birthdate: birthdate,
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
                value={fName}
                onChange={changeFName}
              />
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                part-field='true'
                value={sName}
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
                value={fLastName}
                onChange={changeFLastName}
              />
              <input
                type="text"
                className="form-control"
                part-field='true'
                value={sLastName}
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
                  value={birthdate}
                  onChange={changeBirthdate}
                  style={{ marginLeft: '-40px' }}
                />
              </div>
              {/* Escuela/Unidad */}
              <label
                htmlFor='newPartCommunity'
                className={`form-label ${props.community === 'Escuela' ? 'col-sm-1' : 'col-sm-2'} col align-self-center`}
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
                  display: (props.participant !== 'Docente' ? 'none' : 'inline-block') }}
              >
                Tipo de Personal
              </label>
              <div 
                className='col-sm-3'
                style={{display: (props.participant !== 'Docente' ? 'none' : 'block')}}
              >
                <select
                  id="newPartPersonalType"
                  className='form-select'
                  part-field='true'
                  value={type}
                  onChange={changeType}
                >
                  <option value="Docente">Docente</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Obrero">Obrero</option>
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