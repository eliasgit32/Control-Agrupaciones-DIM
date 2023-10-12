import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableParticipationsGroup() {
  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'actividad',
      label: 'Actividades'
    },
    {
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'cedula',
      label: 'Cédula'
    },
    {
      name: 'carrera',
      label: 'Carrera'
    },
    {
      name: 'periodo',
      label: 'Período'
    }
  ]

  const data = [];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
  }
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Participación en actividades'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}