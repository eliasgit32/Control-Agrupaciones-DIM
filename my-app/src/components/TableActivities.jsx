import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function TableActivities() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = ['Nombre', 'Descripción'];
  const data = [
    ['Actividad 1', 'Descripción 1...'],
    ['Actividad 2', 'Descripción 2...'],
    ['Actividad 3', 'Descripción 3...']
  ];
  const options = {filterType: 'checkbox'};
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Actividades de la agrupación'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}