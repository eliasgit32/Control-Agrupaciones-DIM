import React, { useState } from 'react';
import '../stylesheets/Login.css'
import { useNavigate } from 'react-router-dom';

export default function Login () {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeUsername = e => {
    setUsername(e.target.value)
  }
  
  const changePassword = e => {
    setPassword(e.target.value)
  }

  // const connectDatabase = (e) => {
  //   e.preventDefault();
  //   const conn = connect(username, password);
  //   console.log(username +' '+ password+ ' '+ conn)
  //   if(conn) {
  //     //Ingreso a la HomePage del sistema
  //     navigate('/homepage');
  //   }
  // }
  return(
    <form className='Login'>
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
            type='text'
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