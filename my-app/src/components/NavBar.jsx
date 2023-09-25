import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  
  return(
    <div className='navbar navbar-expand-lg fixed-top bg-primary' data-bs-theme='dark'>
      <div className='container'>
        <NavLink to={'/homepage'} className='navbar-brand'>Dirección de Identidad y Misión -Guayana</NavLink>
        {/* Boton en caso de colapso de navbar */}
        <button 
          // Propiedades de configuracion bootstrap
          className='navbar-toggler collapsed' 
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div 
        className='navbar-collapse collapse'
        id='navbarResponsive'>
        
          <ul className='navbar-nav ms-md-auto'>
            <li className='nav-item dropdown' data-bs-theme="light">
              <NavLink 
              className='nav-link dropdown-toggle'
              data-bs-toggle="dropdown"
              aria-expanded='false'
              >
                Participantes
              </NavLink>
              <div className='dropdown-menu'>
                <Link className='dropdown-item' to={'/RegParticipant/Estudiantes'}>Estudiantes</Link>
                <Link className='dropdown-item' to={'/RegParticipant/Docentes'}>Docentes</Link>
                <Link className='dropdown-item' to={'/RegParticipant/Personal'}>Personal</Link>
                <Link className='dropdown-item' to={'/RegParticipant/Comunidad'}>Miembros de comunidad</Link>
                <Link className='dropdown-item'>Importar lista de estudiantes</Link>
                <Link className='dropdown-item'>Importar lista de docentes</Link>
                <Link className='dropdown-item'>Importar lista de personal</Link>
              </div>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link'>Coordinadores</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link'>Escuelas</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link'>Unidades</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to={'/Communities'}>Comunidades</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link'>Períodos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}