import React from 'react';
import { useState } from 'react';
import '../../stylesheets/ImportStudents.css';
import Papa from 'papaparse';
import TableImport from '../tables/TambleImport';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importParticipants } from '../../API/participants';
import * as XLSX from 'xlsx';

export default function ImportParticipants(props) {
  const { type } = props;

  const[data, setData] = useState([]);

  //Traducción de códigos de carrera al nombre de la escuela
  const traductionMajor = {
    ACA: 'Escuela Administración y Contaduría',
    CSB: 'Escuela de Comunicación Social',
    DCR: 'Escuela de Derecho',
    ICI: 'Escuela de Ingeniería Civil',
    IIN: 'Escuela de Ingeniería Informática'
  }

  //Formetear Apellidos y nombres del listado de personal
  const capitalizeFirstLetter = (str) => {
    const words = str.split(',');
    const lastNames = words[0].split(' ');
    const result = [];

    lastNames.forEach(name => {
      result.push(name[0] + name.slice(1).toLowerCase())
    })

    return result.join(' ') + ',' + words[1];
  }

  //Manejar los datos del archivo
  const handleFile = file => {
    //Comprobar el formato del archvio
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data)
        }
      })
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        parsedData.forEach(person => {
          person['APELLIDOS Y NOMBRES'] = capitalizeFirstLetter(person['APELLIDOS Y NOMBRES']);
        })
        setData(parsedData);
      }
    }

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
    let newParticipants = [];
    if (type === 'Estudiante') {
      newParticipants = data.map((participant) => {
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
    } else if (type === 'Personal') {
      newParticipants = data.map((participant) => {
  
        //Descomponer nombre completo
        const nameParts = participant['APELLIDOS Y NOMBRES'].split(', ');
        const firstNames = nameParts[1];
        const lastNames =  nameParts[0]; 
  
        return {
          cedula: participant['CI'],
          community: participant['DEPENDENCIA'],
          firstNames: firstNames,
          lastNames: lastNames,
          emailUCAB: participant['CORREOS'],
          type: participant['TIPO DE NOMINA'],
          stage: null
        }
      })
    }
    
    importParticipantsMutation.mutate(newParticipants);
    queryClient.invalidateQueries();
    setData([]);
  }

  return(
    <div className='modal modal-lg fade' id='modalImportStudents' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content' style={{background: '#4f4e4e'}}>
          <div className='modal-header'>
            <h5 className='modal-title'>
              Importar {type}
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
                accept='.csv, .xlsx, .xls' 
                id='input-import-students'
                hidden 
                onChange={handleChange}
              />
              <i className="bi bi-file-earmark-arrow-up-fill" 
                style={{fontSize: '100px', marginBottom: '35px', paddingTop: '45px'}}
              ></i>
              <div style={{fontSize: '25px'}}>
                Haga click o arrastre aquí el exportable {type === 'Estudiantes' ? '.csv ' : '.xlsx '} 
                de {type}
              </div>
            </form>
            {/* Contenedor de tabla de participantes a importar */}
            <div style={{display: (data.length < 1 ? 'none' : 'block')}}>
              <TableImport data={data} type={type} traductionMajor={traductionMajor} />
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