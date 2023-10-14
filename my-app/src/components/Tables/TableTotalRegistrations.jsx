import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';


export default function TableTotalRegistrations(props) {
  const {data} = props;

  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'cedula',
      label: 'Cédula'
    },
    {
      name: 'agrupacion',
      label: 'Agrupación'
    },
    {
      name: 'comunidad',
      label: 'Comunidad'
    }
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    print: 'false',
  }
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Inscripción en agrupaciones'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}