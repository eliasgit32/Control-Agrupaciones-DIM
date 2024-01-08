import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOneGroup, updateGroup } from '../API/groups';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Group.css';
import ActivitiesContainer from '../components/ActivitiesContainer';
import PersonalDIMList from '../components/lists/PersonalDIMList';
import { getPersonalDIM } from '../API/participants';

export default function Group() {
  
  const params = useParams();

  //Período académico seleccionado
  const[selectedTerm, setSelectedTerm] = useState(params.selectedTerm);

  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[limit, setLimit] = useState(null);
  const[publico, setPublico] = useState(null);
  const[coordinator, setCoordinator] = useState(null);
  // const[catedra, setCatedra] = useState(null);
  // const[teacher, setTeacher] = useState('');

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value) 
  const changeDescription = e => setDescription(e.target.value)
  const changeLimit = e => setLimit(parseInt(e.target.value))
  const changePublico = e => setPublico(e.target.value)
  const changeCoordinator =  e => setCoordinator(e.target.value)
  // const changeCatedra =  e => setCatedra(e.target.checked)
  // const changeTeacher = e => setTeacher(e.target.value)

  const groupInfoQuery = useQuery(['group', params.id, selectedTerm], 
  () => getOneGroup(params.id, selectedTerm));

  const personalDIMQuery = useQuery(['personalDIM'], getPersonalDIM);

  //Cliente para funcion de actualizacion de grupo
  const queryClient = useQueryClient();

  //Mutacion actualizar agrupacion
  const updateGroupMutation = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  if (groupInfoQuery.isLoading || personalDIMQuery.isLoading) {
    return (
      <>
        <NavBar></NavBar>
        <InfoSideBar>Cargando...</InfoSideBar>;
      </>
    ) 
  }

  const data =  groupInfoQuery.data;
  const personalDIM = personalDIMQuery.data; 
  
  //Verificar que los inputs estan vacios o no hayan cambiado su valor
  const invalidInputs = ( (name === null || name === data[0].nombre)
  && (description === null || description === data[0].descripcion)
  && (limit === null || limit === data[0].cupos) 
  && (publico === null || publico === data[0].publico)
  && (coordinator === null || coordinator === data[0].coordinador.toString())
  /*&& (catedra === null || catedra === data[0].catedra)*/);

  //Cancelar actualizar info de grupo
  const handleCancel = () => {
    //Reinicializar cada input en null para volver reestablecer
    //valores de data[0] en ellos
    setName(null);
    setDescription(null);
    setLimit(null);
    setPublico(null);  
    setCoordinator(null);
  }

  //Guardar actualización de grupo
  const handleUpdate = () => {
    const group = {
      id: parseInt(params.id),
      name: document.getElementById('groupName').value,
      description: document.getElementById('groupDesc').value,
      limit: parseInt(document.getElementById('groupLimit').value),
      publico: document.getElementById('groupPublic').value,
      coordinator: parseInt(document.getElementById('groupCoord').value),
      term: selectedTerm
      // catedra: document.getElementById('isCatedra').checked
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
          <p 
            className='col-sm-4' 
            id='groupTotalSigned' 
            style={{marginBottom: '0', fontSize: '22px', color: '#181818'}}
          >
            {data[0].inscritos}
          </p>
        </div>
        {/* Coordinador */}
        <div className='mb-3 row'>
          <label htmlFor='groupCoord' className='form-label col-sm-5'>Coordinador:</label>
          <div className='col-sm-6'>
            <select 
              className='form-select' 
              id="groupCoord" 
              dark='true'
              onChange={changeCoordinator}
              value={coordinator || data[0].coordinador}
            >
              <PersonalDIMList data={personalDIM} />
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

      {/* Contenedor de las actividades en pantalla */}
      <ActivitiesContainer group={data[0]} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      
    </div>
  );
}