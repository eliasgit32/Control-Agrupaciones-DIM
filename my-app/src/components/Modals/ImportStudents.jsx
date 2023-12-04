import React from 'react';
import { useState } from 'react';
import '../../stylesheets/ImportStudents.css';
import Papa from 'papaparse';
import TableImport from '../tables/TambleImport';

export default function ImportStudents() {
  const[data, setData] = useState([]);

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
    console.log(e.target.files[0]);
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

  const handleSave = () => {

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
              onClick={handleClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}