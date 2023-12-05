import React from 'react';
import { useState } from 'react';
import '../../stylesheets/ImportStudents.css';
import Papa from 'papaparse';
import TableImport from '../tables/TambleImport';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importParticipants } from '../../API/participants';

export default function ImportParticipants() {
  const[data, setData] = useState([]);

  //Traducción de códigos de carrera al nombre de la carrera
  const traductionMajor = {
    ACA: 'Administración Empresas',
    CSB: 'Com. Social',
    DCR: 'Derecho',
    ICI: 'Ing. Civil',
    IIN: 'Ingeniería'
  }

  //Manejar los datos del archivo con Papa.parse()
  const handleFile = file => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data)
      }
    })
  }

  //Manejar el cambio del archivo ingresado en el input
  const handleChange = e => {
    handleFile(e.target.files[0]);
    e.target.value = null;
  }

  //Manejar soltar el archivo csv en el input
  const handleDrop = e => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  const handleClose = () => {
    setData([]);
  }

  const queryClient = useQueryClient();

  const importParticipantsMutation = useMutation({
    mutationFn: importParticipants,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleSave = () => {
    const newParticipants = data.map((participant) => {
      const newMajor = traductionMajor[participant.MAJOR.slice(0, 3)];

      //Descomponer nombre completo
      const nameParts = participant.NOMBRE_ESTUDIANTE.split(', ');
      const firstNames = nameParts[1];
      const lastNames =  nameParts[0]; 

      return {
        cedula: participant.CEDULA,
        community: newMajor,
        firstNames: firstNames,
        lastNames: lastNames,
        emailUCAB: participant.ESTU_EMAIL_ADDRESS,
        type: 'Estudiante',
        stage: 'Familiarización'
      }
    })
    importParticipantsMutation.mutate(newParticipants);
    queryClient.invalidateQueries();
    setData([]);
  }

  return(
    <div className='modal modal-lg fade' id='modalImportStudents' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              Importar Estudiantes
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={handleClose}>
            </button>
          </div>
          <div className='modal-body'>
            {/* Formulario de carga de archivo */}
            <form 
              action="" 
              id='import-form'
              onClick={() => document.getElementById('input-import-students').click()}
              style={{margin: '0 auto', display: (data.length < 1 ? 'flex' : 'none')}}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input 
                type='file' 
                accept='.csv' 
                id='input-import-students'
                hidden 
                onChange={handleChange}
              />
              <i className="bi bi-file-earmark-arrow-up-fill" 
                style={{fontSize: '100px', marginBottom: '35px', paddingTop: '45px'}}
              ></i>
              <div style={{fontSize: '25px'}}>Haga click o arrastre aquí el exportable .csv de estudiantes</div>
            </form>
            {/* Contenedor de tabla de participantes a importar */}
            <div style={{display: (data.length < 1 ? 'none' : 'block')}}>
              <TableImport data={data} />
            </div>
            <p></p>
          </div>
          <div className='modal-footer'>
          <button
              type='button'
              className='btn btn-danger'
              data-bs-dismiss='modal'
              onClick={handleClose}>Cancelar</button>
          <button
              type='button'
              className='btn btn-success'
              data-bs-dismiss='modal'
              onClick={handleSave}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}