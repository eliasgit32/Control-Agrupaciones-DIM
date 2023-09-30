import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOneGroup, updateGroup } from '../API/groups';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Group.css';
import TermSelect from '../components/TermSelect';
import PlusButton from '../components/PlusButton';
import ActList from '../components/ActList';
import AddActivity from '../components/Modals/AddActivity';
import NewActivity from '../components/Modals/NewActivity';
import SignUpParticipants from '../components/Modals/SignUpParticipants';

export default function Group() {
  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[limit, setLimit] = useState(null);
  const[publico, setPublico] = useState(null);

  //Período seleccionado en el SelectTerms
  const[selectedTerm, setSelectedTerm] = useState('2024-15');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value) 
  const changeDescription = e => setDescription(e.target.value)
  const changeLimit = e => setLimit(parseInt(e.target.value))
  const changePublico = e => setPublico(e.target.value)

  const params = useParams();

  const { isLoading, data } = useQuery(['group', params.id], () => getOneGroup(params.id));

  //Cliente para funcion de actualizacion de grupo
  const queryClient = useQueryClient();

  //Mutacion actualizar agrupacion
  const updateGroupMutation = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['group', params.id]);
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
  const invalidInputs = ( (name === null || name === data[0].nombre)
  && (description === null || description === data[0].descripcion)
  && (limit === null || limit === data[0].cupos) 
  && (publico === null || publico === data[0].publico));

 

  //Cancelar actualizar info de grupo
  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data[0] en ellos
    setName(null);
    setDescription(null);
    setLimit(null);
    setPublico(null);  
  }

  //Guardar actualización de grupo
  const handleUpdate = () => {
    const group = {
      id: parseInt(params.id),
      name: document.getElementById('groupName').value,
      description: document.getElementById('groupDesc').value,
      limit: parseInt(document.getElementById('groupLimit').value),
      publico: document.getElementById('groupPublic').value
    }
    updateGroupMutation.mutate(group);
  }

  return (
    <div>
      <NavBar></NavBar>
      <InfoSideBar>
        {/* Nombre */}
        <div className='my-4 text-center'>
          <input
            type="text"
            className='form-control'
            id='groupName'
            dark='true'
            onChange={changeName}
            value={name || (name !== '' ? data[0].nombre : '')} />
        </div>
        {/* Descripción */}
        <div className='mb-3'>
          <label htmlFor='groupDesc' className='form-label'>Descripcion</label>
          <textarea 
          className='form-control' 
          id='groupDesc' 
          rows='4'
          dark='true'
          onChange={changeDescription}
          value={description || (description !== '' ? data[0].descripcion : '')}></textarea>
        </div>
        {/* Cupos */}
        <div className='mb-3 row'>
          <label htmlFor="groupLimit" 
          className='form-label col-sm-3'>
            Cupos
          </label>
          <div className='col-sm-3'>
            <input type='number'
            className='form-control'
            id='groupLimit' 
            min={0}
            dark='true'
            onChange={changeLimit}
            value={limit || (limit !== 0 ? data[0].cupos : 0)}/>
          </div>
        </div>
        {/* Total Inscritos */}
        <div className='mb-3 row'>
          <label className='form-label col-sm-6'>Total inscritos: </label>
          <p className='col-sm-5' id='groupTotalSigned'>*Falta agregar*</p>
        </div>
        {/* Coordinador */}
        <div className='mb-3 row'>
          <label htmlFor='groupCoord' className='form-label col-sm-5'>Coordinador:</label>
          <div className='col-sm-6'>
            <select className='form-select' id="groupCoord" dark='true'>
              <option value="">*Falta agregar*</option>
            </select>
          </div>
        </div>
        {/* Publico */}
        <div className='mb-3 row'>
          <label htmlFor='groupPublic' className='form-label col-sm-4'>Dirigido a:</label>
          <div className='col-sm-5'>
            <select
              className='form-select'
              id="groupPublic"
              dark='true'
              onChange={changePublico}
              value={publico || data[0].publico}>
              <option value="Estudiantes">Estudiantes</option>
              <option value="Docentes">Docentes</option>
              <option value="Personal">Personal</option>
              <option value="Comunidad">Comunidad</option>
              <option value="Mixto">Mixto</option>
            </select>
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

      {/* Select de períodos académicos */}
      <div className='term-container'>
        <div className='text-center justify-content-center row mt-4'>
          <label htmlFor="selectTerms" className='form-label col-sm-2'>Períodos</label>
          <div className='col-sm-4'>
            <TermSelect setSelectedTerm={setSelectedTerm}/>
          </div>
        </div>
      </div>

      {/* Lista de Actividades de la agrupación */}
      <ActList />

      {/* Botones opciones de agrupación */}
      <div className='buttons-container text-center d-flex justify-content-center'>
        <button 
        type='button' 
        className='btn btn-success'
        data-bs-toggle='modal'
        data-bs-target='#modalSignUpParticipants'>
          Inscribir Participantes
        </button>
        <button type='button' className='btn btn-info'>Exportar Cronograma Actividades</button>
        <PlusButton 
        type='AddActivity' 
        font='17px' 
        styleClass=''/>
      </div>

      {/* Modal de nueva actividad */}
      <AddActivity selectedTerm={selectedTerm} groupID={data[0].id} />
      <NewActivity groupName={data[0].nombre} groupID={data[0].id}/>
      {/* Modal de inscribir participante */}
      <SignUpParticipants />
    </div>
  );
}