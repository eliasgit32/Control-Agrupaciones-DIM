import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import LetterAvatar from '../components/LetterAvatar';
import NavBar from '../components/NavBar';
import ParticipationHistory from '../components/ParticipationHistory';
import '../stylesheets/Participant.css'
import { getInfoParticipant } from '../API/participants';
import { useQuery } from '@tanstack/react-query';
import {parseISO} from 'date-fns';
import DatePicker from 'react-datepicker';

export default function Participant() {
  const params = useParams();

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

  const { isLoading, data } = useQuery(['group', params.cedula], () => getInfoParticipant(params.cedula));

  if (isLoading) {
    return (
      <>
        <NavBar></NavBar>
        <InfoSideBar>Cargando...</InfoSideBar>;
      </>
    ) 
  }

  console.log(data);

  return (
    <>
      <NavBar />
      <InfoSideBar>
        {/* Avatar de participante */}
        <div className='my-4 d-flex justify-content-center'>
          <LetterAvatar 
            name={data[0].primerNombre} 
            lastName={data[0].primerApellido} 
          />
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
              value={params.cedula}
              id='id-part' 
              readOnly={true}/>
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
            readOnly={true}
            value={data[0].primerNombre}
          />
          <input
            type="text"
            aria-label="Last name"
            className="form-control"
            dark='true'
            part-field='true' 
            readOnly={true}
            value={data[0].segundoNombre}
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
            readOnly={true}
            value={data[0].primerApellido} 
          />
          <input
            type="text"
            className="form-control"
            dark='true'
            part-field='true' 
            readOnly={true}
            value={data[0].segundoApellido} 
          />
        </div>
        {/* Fecha nacimiento */}
        <div className='mb-2 row'>
          <label htmlFor='birthdate'
            className='form-label col-sm-6 col align-self-center' part-field='true'>
            Fecha Nacimiento:
          </label>
          <div className='col-sm-5'>
            <DatePicker 
              selected={parseISO(data[0].fechaNac)} 
              readOnly={true}
            />
          </div>
        </div>
        {/* Tipo de participante */}
        <div className='mb-2 row'>
          <label htmlFor='partType'
            className='form-label col-sm-2' part-field='true'>Tipo:</label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control text-center'
              dark='true'
              part-field='true'
              readOnly={true}
              value={data[0].tipo}
              id='partType' 
            />
          </div>
        </div>
        {/* Comunidad/Escuela/Unidad del participante */}
        <div className='mb-2 row'>
          <label htmlFor='partCommunity'
            className='form-label col-sm-4' part-field='true'>Comunidad:</label>
          <div className='col-sm-5'>
            <input
              type="text"
              className='form-control text-center'
              dark='true'
              part-field='true'
              readOnly={true}
              value={data[0].nombreComunidad}
              id='partCommunity'
            />
          </div>
        </div>
        {/* Etapa */}
        <div className='mb-2 row'>
          <label htmlFor='phase-part' className='form-label col-sm-2 col align-self-center' part-field='true'>
            Etapa:
          </label>
          <div className='col-sm-6'>
             <select
              className='form-select'
              id="partPhase"
              dark='true'
              part-field='true'
              defaultValue={data[0].etapa}
              >
              <option value="Familiarización">Familiarización</option>
              <option value="???">???</option>
              <option value="Opción">Opción</option>
            </select>
          </div>
        </div>
        {/* Email */}
        <div className='mb-2 row'>
          <label htmlFor='partEmail' className='form-label col-sm-6 col align-self-center' part-field='true'>
            Correo Electrónico:
          </label>
          <div className='col-sm-6'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              id='partEmail' 
              readOnly={true}
              value={data[0].email}
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
              id='tlp-part' 
              readOnly={true}
              value={data[0].telefono}  
            />
          </div>
        </div>
        {/* Período de ingreso */}
        <div className='mb-2 row'>
          <label htmlFor='partTerm'
            className='form-label col-sm-6' part-field='true'>Período de Ingreso:</label>
          <div className='col-sm-4'>
          <input
              type="text"
              className='form-control text-center'
              dark='true'
              part-field='true'
              id='partTerm' 
              readOnly={true}
              value={data[0].periodoIngreso}  
            />
          </div>
        </div>
        {/* Email Institucional */}
        <div className='mb-2 row'>
          <label htmlFor='partEmailInst' className='form-label col-sm-5 col align-self-center' part-field='true'>
            Correo UCAB:
          </label>
          <div className='col-sm-6'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              id='partEmailInst' 
              readOnly={true}
              value={data[0].emailInst}  
            />
          </div>
        </div>
        
        {/* Botones de guardado y cancelacion
        <div className='text-center'>
          <button
            type='button'
            className={invalidInputs ? 'btn btn-danger disabled' : 'btn btn-danger'}
            onClick={handleCancel}>Cancelar</button>
          <button
            type='button'
            className={invalidInputs ? 'btn btn-success disabled' : 'btn btn-success'}
            onClick={handleUpdate}>Guardar Cambios</button>
        </div> */}
      </InfoSideBar>

      {/* Acordión de historial */}
      <div className='history-container'>
        <ParticipationHistory />
      </div>
    </>
  );
}