import React, { useState } from 'react';
import '../stylesheets/Login.css'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {connection} from '../API/connectUser';
import { useEffect } from 'react';

export default function Login () {

  //Inputs del login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeUsername = e => setUsername(e.target.value)
  
  const changePassword = e => setPassword(e.target.value)
  

  //Objeto query para realizar peticiones a la API
  const {isLoading, data, refetch} = useQuery({
    queryKey: ['login', username, password],
    queryFn: async () => await connection(username, password),
    enabled: false
  });

  //Esperar a que terminen de cargar los datos 
  useEffect(() => {
    if(isLoading){
      return
    }
    console.log(data);
    if(data.user === 1) {
      //Ingreso a la HomePage del sistema
      navigate('/homepage');
    }
  })

  const connectDatabase = async (e) => {
    e.preventDefault();
    await refetch();
  } 
  
  return(
    //Falta Agregar la función para conectar a base de datos
    <form className='Login' onSubmit={connectDatabase}>
      <div className='inputs-container'>
        <div className='username-container'>
          <input 
            type='text' 
            className='login-input' 
            placeholder='Nombre de Usuario'
            onChange={changeUsername}
          />
        </div>
        
        <div className='password-container'>
          <input 
            type='password'
            className='login-input'
            placeholder='Contraseña' 
            onChange={changePassword}
          />
        </div>
      </div>
      
      <button id='login-button'>Ingresar</button>
      
      {/* Nota a pie de pagina */}
      <footer>
        <p id='login-advice'>En caso de no recordar credecenciales de acceso...</p>
      </footer>
    </form>
  );
}