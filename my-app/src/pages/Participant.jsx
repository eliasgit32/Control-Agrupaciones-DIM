import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSideBar from '../components/InfoSideBar';
import LetterAvatar from '../components/LetterAvatar';
import NavBar from '../components/NavBar';
import ParticipationHistory from '../components/ParticipationHistory';
import '../stylesheets/Participant.css'
import { getInfoParticipant, updateParticipant } from '../API/participants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Participant() {
  const params = useParams();

  //Inputs
  const[firstNames, setFirstFNames] = useState(null);
  const[lastNames, setLastNames] = useState(null);
  const[stage, setStage] = useState(null);
  const[email, setEmail] = useState(null);
  const[tlphone, setTlphone] = useState(null);
  const[emailUCAB, setEmailUCAB] = useState(null);

  //Funciones del manejo de inputs 
  const changeFirstNames = e => setFirstFNames(e.target.value)
  const changeLastNames = e => setLastNames(e.target.value)
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
    },
    onError: () => {
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
  const invalidInputs = ( (firstNames === null || firstNames === data[0].nombres) 
  && (lastNames === null || lastNames === data[0].apellidos) 
  && (stage === null || stage === data[0].etapa)
  && (email === null || email === data[0].email) 
  && (tlphone === null || tlphone === data[0].telefono) 
  && (emailUCAB === null || emailUCAB === data[0].emailInst));

  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data[0] en ellos
    setFirstFNames(null);
    setLastNames(null);
    setStage(null);  
    setEmail(null);
    setTlphone(null);
    setEmailUCAB(null);
  }

  const handleUpdate = () => {
    const participant = {
      firstNames: document.getElementById('firstNames').value,
      lastNames: document.getElementById('lastNames').value,
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
            name={data[0].nombres} 
            lastName={data[0].apellidos} 
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
        {/* Nombres */}
        <div className='mb-2 row'>
          <label htmlFor='firstNames' className='form-label col-sm-3 col align-self-center' part-field='true'>
            Nombres:
          </label>
          <div className='col-sm-6'>
            <input
              type="text"
              className="form-control"
              dark='true'
              part-field='true'
              id='firstNames'
              onChange={changeFirstNames}
              value={firstNames || (firstNames !== '' ? data[0].nombres : '')}
            />
          </div>          
        </div>
        {/* Apellidos */}
        <div className='mb-2 row'>
          <label htmlFor='lastNames' className='form-label col-sm-3 col align-self-center' part-field='true'>
            Apellidos:
          </label>
          <div className='col-sm-6'>
            <input
              type="text"
              className="form-control"
              dark='true'
              part-field='true' 
              id='lastNames'
              onChange={changeLastNames}
              value={lastNames || (lastNames !== '' ? data[0].apellidos : '')}
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
          <div className='col-sm-8'>
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
              value={email || (email !== '' ? (!data[0].email ? '' : data[0].email) : '')}
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
        {/* Email Institucional */}
        <div className='mb-2 row' style={{display: (data[0].tipo === 'Comunidad' ? 'none' : 'flex')}}>
          <label htmlFor='partEmailInst' className='form-label col-sm-5 col align-self-center' part-field='true'>
            Correo UCAB:
          </label>
          <div className='col-sm-7'>
            <input
              type="text"
              className='form-control'
              dark='true'
              part-field='true'
              id='emailInst' 
              onChange={changeEmailUCAB}
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