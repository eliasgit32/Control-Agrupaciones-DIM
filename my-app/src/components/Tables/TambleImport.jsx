import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableImport(props) {
  const { data, type, traductionMajor } =  props;

  //Conversión de datos en array más ligero
  const lighterData = data.map((participant) => {
    if(type === 'Estudiante') {
      const newMajor = traductionMajor[participant.MAJOR.slice(0, 3)];
      return {
        CEDULA: participant.CEDULA,
        MAJOR: newMajor,
        NOMBRE_ESTUDIANTE: participant.NOMBRE_ESTUDIANTE,
        ESTU_EMAIL_ADDRESS: participant.ESTU_EMAIL_ADDRESS
      }
    } else if (type === 'Personal') {
      return {
        CEDULA: participant['CI'],
        UnidadEscuela: participant['DEPENDENCIA'],
        NOMBRE: participant['APELLIDOS Y NOMBRES'],
        EMAIL_ADDRESS: participant['CORREOS']
      } 
    }
    return null;
  })

  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columnStudent = [
    {
      name: 'CEDULA',
      label: 'Cédula'
    },
    {
      name: 'MAJOR',
      label: 'Escuela'
    },
    {
      name: 'NOMBRE_ESTUDIANTE',
      label: 'Nombre Completo'
    },
    {
      name: 'ESTU_EMAIL_ADDRESS',
      label: 'Correo UCAB'
    },
  ]
  const columnPersonal = [
    {
      name: 'CEDULA',
      label: 'Cédula'
    },
    {
      name: 'UnidadEscuela',
      label: 'Unidad/Escuela'
    },
    {
      name: 'NOMBRE',
      label: 'Nombre Completo'
    },
    {
      name: 'EMAIL_ADDRESS',
      label: 'Correo UCAB'
    },
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    print: 'false',
    download: false
  }
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Datos a importar'}
        data={lighterData}
        columns={type === 'Estudiante' ? columnStudent : columnPersonal}
        options={options}
      />
    </ThemeProvider>
  )
}