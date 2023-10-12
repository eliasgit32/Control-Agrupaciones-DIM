import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsActivities() {
  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'nombreAct',
      label: 'Actividad'
    },
    {
      name: 'descripcionAct',
      label: 'Descripción Actividad'
    },
    {
      name: 'part-insc',
      label: 'Part/Insc'
    },
    {
      name: 'participacion',
      label: 'Participación'
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
        title={'Estadísticas de actividades'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}