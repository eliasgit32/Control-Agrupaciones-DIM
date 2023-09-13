import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOneGroup, updateGroup } from '../API/group';
import InfoSideBar from '../components/InfoSideBar';
import NavBar from '../components/NavBar';
import '../stylesheets/Group.css';

export default function Group() {
  //Inputs
  const[name, setName] = useState(null);
  const[description, setDescription] = useState(null);
  const[limit, setLimit] = useState(null);
  const[publico, setPublico] = useState(null);

  //Funciones del manejo de inputs
  const changeName = e => setName(e.target.value) 
    
  const changeDescription = e => setDescription(e.target.value)
  const changeLimit = e => setLimit(parseInt(e.target.value))
  const changePublico = e => setPublico(e.target.value)

  const params = useParams();

  //Cliente para funcion de actualizacion de grupo
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(['group', params.id], () => getOneGroup(params.id));

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

  //Mutacion actualizar agrupacion
  const updateGroupMutation = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['group', params.id]);
    }
  })

  //Cancelar actualizar info de grupo
  const handleCancel = () => {

  }

  //Guardar actualizacion de grupo
  const handleUpdate = () => {
    const group = {
      id: params.id,
      name: name,
      description: description,
      limit: limit,
      publico: publico
    }
    updateGroupMutation.mutate(group);
  }

  //REPENSAR LA LOGICA PARA INICIALIZAR TODOS
  //CON LOS VALORES DE DATA???
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
        {/* Descripcion */}
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
        {/* SOLUCIONAR BOTONES NO SE ACTIVAN */}
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
    </div>
  );
}