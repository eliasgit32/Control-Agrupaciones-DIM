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
  const data = [];
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