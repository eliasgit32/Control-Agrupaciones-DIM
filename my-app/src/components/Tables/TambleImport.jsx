import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableImport(props) {
  const { data } =  props;

  //Traducción de códigos de carrera al nombre de la carrera
  const traductionMajor = {
    ACA: 'Administración Empresas',
    CSB: 'Com. Social',
    DCR: 'Derecho',
    ICI: 'Ing. Civil',
    IIN: 'Ingeniería'
  }

  //Conversión de datos en array más ligero
  const lighterData = data.map((participant) => {
    const newMajor = traductionMajor[participant.MAJOR.slice(0, 3)];
    return {
      CEDULA: participant.CEDULA,
      MAJOR: newMajor,
      NOMBRE_ESTUDIANTE: participant.NOMBRE_ESTUDIANTE, 
      ESTU_EMAIL_ADDRESS: participant.ESTU_EMAIL_ADDRESS
    }
  })

  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'CEDULA',
      label: 'Cédula'
    },
    {
      name: 'MAJOR',
      label: 'Carrera'
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
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}