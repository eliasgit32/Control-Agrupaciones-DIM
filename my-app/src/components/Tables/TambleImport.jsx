import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableImport(props) {
  const { data } =  props;

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
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}