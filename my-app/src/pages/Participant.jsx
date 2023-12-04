import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import LetterAvatar from '../components/LetterAvatar';
import NavBar from '../components/NavBar';
import ParticipationHistory from '../components/ParticipationHistory';
import '../stylesheets/Participant.css'
import { getInfoParticipant, updateParticipant } from '../API/participants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import {parseISO, set} from 'date-fns';
// import DatePicker from 'react-datepicker';

export default function Participant() {
  const params = useParams();

  //Inputs
  const[fName, setFName] = useState(null);
  const[sName, setSName] = useState(null);
  const[fLastName, setFLastName] = useState(null);
  const[sLastName, setSLastName] = useState(null);
  const[stage, setStage] = useState(null);
  const[email, setEmail] = useState(null);
  const[tlphone, setTlphone] = useState(null);
  const[emailUCAB, setEmailUCAB] = useState(null);

  //Funciones del manejo de inputs 
  const changeFName = e => setFName(e.target.value)
  const changeSName = e => setSName(e.target.value)
  const changeFLastName = e => setFLastName(e.target.value)
  const changeSLastName = e => setSLastName(e.target.value)
  const changeStage = e => setStage(e.target.value)
  const changeEmail = e => setEmail(e.target.value) 
  const changeTlphone = e => setTlphone(e.target.value)
  const changeEmailUCAB = e => setEmailUCAB(e.target.value)

  const { isLoading, data } = useQuery(['group', params.cedula], () => getInfoParticipant(params.cedula));

  const queryClient = useQueryClient();

  //Mutación actualizar participante
  const updateParticipantMutation = useMutation({
    mutationFn: updateParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })
  
  if (isLoading) {
    return (
      <>
        <NavBar></NavBar>
        <InfoSideBar>Cargando...</InfoSideBar>;
      </>
    ) 
  }

  //Verificar que los inputs estan vacios o no hayan cambiado su valor
  const invalidInputs = ( (fName === null || fName === data[0].primerNombre) 
  && (sName === null || sName === data[0].segundoNombre) 
  && (fLastName === null || fLastName === data[0].primerApellido) 
  && (sLastName === null || sLastName === data[0].segundoApellido)
  && (stage === null || stage === data[0].etapa)
  && (email === null || email === data[0].email) 
  && (tlphone === null || tlphone === data[0].telefono) 
  && (emailUCAB === null || emailUCAB === data[0].emailInst));

  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data[0] en ellos
    setFName(null);
    setSName(null);
    setFLastName(null);
    setSLastName(null);
    setStage(null);  
    setEmail(null);
    setTlphone(null);
    setEmailUCAB(null);
  }

  const handleUpdate = () => {
    const participant = {
      fName: document.getElementById('firstName').value,
      sName: document.getElementById('secondName').value,
      fLastName: document.getElementById('fLastName').value,
      sLastName: document.getElementById('sLastName').value,
      stage: document.getElementById('stagePart').value,
      email: document.getElementById('email').value,
      tlphone: document.getElementById('tlphone').value,
      emailUCAB: document.getElementById('emailInst').value,
    }
    const cedula = params.cedula;
    updateParticipantMutation.mutate({cedula, participant})
  }


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
            id='firstName'
            onChange={changeFName}
            value={fName || (fName !== '' ? data[0].primerNombre : '')}
          />
          <input
            type="text"
            className="form-control"
            dark='true'
            part-field='true' 
            id='secondName'
            onChange={changeSName}
            value={sName || (sName !== '' ? data[0].segundoNombre : '')}
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
            id='fLastName'
            onChange={changeFLastName}
            value={fLastName || (fLastName !== '' ? data[0].primerApellido : '')} 
          />
          <input
            type="text"
            className="form-control"
            dark='true'
            part-field='true' 
            id='sLastName'
            onChange={changeSLastName}
            value={sLastName || (sLastName !== '' ? data[0].segundoApellido : '')} 
          />
        </div>
        {/* Fecha nacimiento */}
        {/* <div className='mb-2 row'>
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
        </div> */}
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
              value={data[0].comunidad}
              id='partCommunity'
            />
          </div>
        </div>
        {/* Etapa */}
        <div 
          className='mb-2 row' 
          style={{display: (data[0].tipo === 'Estudiante' ? 'flex' : 'none')}}
        >
          <label htmlFor='phase-part' className='form-label col-sm-2 col align-self-center' part-field='true'>
            Etapa:
          </label>
          <div className='col-sm-6'>
             <select
              className='form-select'
              id="stagePart"
              dark='true'
              part-field='true'
              onChange={changeStage}
              value={stage || (data[0].etapa ? data[0].etapa : '')}
              >
              <option value="Familiarización">Familiarización</option>
              <option value="Involucramiento">Involucramiento</option>
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
              id='email' 
              onChange={changeEmail}
              value={email || (email !== '' ? data[0].email : '')}
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
              id='tlphone'
              onChange={changeTlphone} 
              value={tlphone || (tlphone !== '' ? data[0].telefono : '')}  
            />
          </div>
        </div>
        {/* Período de ingreso */}
        {/* <div className='mb-2 row'>
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
        </div> */}
        {/* Email Institucional */}
        <div className='mb-2 row' style={{display: (data[0].tipo === 'Comunidad' ? 'none' : 'flex')}}>
          <label htmlFor='partEmailInst' className='form-label col-sm-5 col align-self-center' part-field='true'>
            Correo UCAB:
          </label>
          <div className='col-sm-6'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              id='emailInst' 
              onChange={changeEmailUCAB} //(data[0].emailInst ? data[0].emailInst : '')
              value={emailUCAB || (emailUCAB !== '' ? data[0].emailInst : '')}  
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
        <ParticipationHistory cedula={params.cedula}/>
      </div>
    </>
  );
}