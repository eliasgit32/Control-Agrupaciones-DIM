import React, { useState } from 'react';
import InfoSideBar from '../components/InfoSideBar';
import LetterAvatar from '../components/LetterAvatar';
import NavBar from '../components/NavBar';
import ParticipationHistory from '../components/ParticipationHistory';
import '../stylesheets/Participant.css'

export default function Participant() {
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

  //Verificar que los inputs estan vacios o no hayan cambiado su valor
  const invalidInputs = ( (cedula === null) && (fName === null) 
  && (sName === null) && (fLastName === null) && (sLastName === null) 
  && (birthdate === null) && (type === null) && (community === null)
  && (email === null) && (tlp === null) && (firstTerm === null)
  && (emailUCAB === null));

  const handleCancel = () => {

  }

  const handleUpdate = () => {
    
  }

  return (
    <>
      <NavBar />
      <InfoSideBar>
        {/* Avatar de participante */}
        <div className='my-4 d-flex justify-content-center'>
          <LetterAvatar name='Elias' lastName='Peñalver' />
        </div>
        {/* Cédula */}
        <div className='mb-2 row'>
          <label htmlFor='id-part' className='form-label col-sm-3 col align-self-center' part-field='true'>
            Cédula:
          </label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              defaultValue='*Cédula*'
              id='id-part' 
              onChange={changeCedula}/>
          </div>
        </div>
        {/* 1er y 2do nombre */}
        <div className='input-group mb-2'>
          <span className="input-group-text" part-field='true'>1er y 2do Nombre</span>
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            dark='true'
            part-field='true' 
            defaultValue='Elias'
            onChange={changeFName}
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control"
            dark='true'
            part-field='true' 
            defaultValue='José'
            onChange={changeSName}
          />
        </div>
        {/* 1er y 2do apellido */}
        <div className='input-group mb-2'>
          <span className="input-group-text" part-field='true'>1er y 2do Apellido</span>
          <input
            type="text"
            className="form-control"
            dark='true'
            part-field='true' 
            defaultValue='Peñalver'
            onChange={changeFLastName}  
          />
          <input
            type="text"
            className="form-control"
            dark='true'
            part-field='true' 
            defaultValue='Butto'
            onChange={changeSLastName}  
          />
        </div>
        {/* Fecha nacimiento */}
        <div className='mb-2 row'>
          <label htmlFor='birthdate'
            className='form-label col-sm-5 col align-self-center' part-field='true'>
            Fecha Nacimiento:
          </label>
          <div className='col-sm-5'>
            <input
              type="date"
              className='form-control'
              dark='true'
              part-field='true'
              id='birthdate'
              defaultValue='2023-09-16' 
              onChange={changeBirthdate}  
            />
          </div>
        </div>
        {/* Tipo de participante */}
        <div className='mb-2 row'>
          <label htmlFor='partType'
            className='form-label col-sm-2' part-field='true'>Tipo:</label>
          <div className='col-sm-5'>
            <select
              className='form-select'
              id="partType"
              dark='true'
              part-field='true'
              onChange={changeType}>
              <option value="Estudiante">Estudiantes</option>
              <option value="Docente">Docentes</option>
              <option value="Personal">Personal</option>
              <option value="Comunidad">Comunidad</option>
            </select>
          </div>
        </div>
        {/* Comunidad/Escuela/Unidad del participante */}
        <div className='mb-2 row'>
          <label htmlFor='partCommunity'
            className='form-label col-sm-2' part-field='true'>Escuela:</label>
          <div className='col-sm-5'>
            <select
              className='form-select'
              id="partCommunity"
              dark='true'
              part-field='true'
              onChange={changeCommunity}>
              <option value="Estudiante">*Escuela*</option>
              <option value="Docente">*Und. Administrativa*</option>
              <option value="Personal">*Comunidad*</option>
            </select>
          </div>
        </div>
        {/* Etapa */}
        <div className='mb-2 row'>
          <label htmlFor='phase-part' className='form-label col-sm-2 col align-self-center' part-field='true'>
            Etapa:
          </label>
          <div className='col-sm-4'>
            <input
              type="text"
              className='form-control text-center'
              dark='true'
              part-field='true'
              readOnly={true}
              defaultValue='*Etapa*'
              id='phase-part' />
          </div>
        </div>
        {/* Email */}
        <div className='mb-2 row'>
          <label htmlFor='partEmail' className='form-label col-sm-6 col align-self-center' part-field='true'>
            Correo Electrónico:
          </label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              defaultValue='*Email*'
              id='partEmail' 
              onChange={changeEmail}
            />
          </div>
        </div>
        {/* Teléfono */}
        <div className='mb-2 row'>
          <label htmlFor='tlp-part' className='form-label col-sm-4 col align-self-center' part-field='true'>
            Teléfono:
          </label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              defaultValue='*Teléfono*'
              id='tlp-part' 
              onChange={changeTlp}  
            />
          </div>
        </div>
        {/* Período de ingreso */}
        <div className='mb-2 row'>
          <label htmlFor='partTerm'
            className='form-label col-sm-6' part-field='true'>Período de Ingreso:</label>
          <div className='col-sm-5'>
            <select
              className='form-select text-center'
              id="partTerm"
              dark='true'
              part-field='true'
              onChange={changeFirstTerm}>
              <option value="Estudiante">2024-15</option>
              <option value="Docente">2024-25</option>
            </select>
          </div>
        </div>
        {/* Email Institucional */}
        <div className='mb-2 row'>
          <label htmlFor='partEmailInst' className='form-label col-sm-5 col align-self-center' part-field='true'>
            Correo UCAB:
          </label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              defaultValue='*Email UCAB*'
              id='partEmailInst' 
              onChange={changeEmailUCAB}  
            />
          </div>
        </div>
        
        {/* Botones de guardado y cancelacion */}
        <div className='text-center'>
          <button
            type='button'
            className={invalidInputs ? 'btn btn-danger disabled' : 'btn btn-danger'}
            onClick={handleCancel}>Cancelar</button>
          <button
            type='button'
            className={invalidInputs ? 'btn btn-success disabled' : 'btn btn-success'}
            onClick={handleUpdate}>Guardar Cambios</button>
        </div>
      </InfoSideBar>

      {/* Acordión de historial */}
      <div className='history-container'>
        <ParticipationHistory />
      </div>
    </>
  );
}