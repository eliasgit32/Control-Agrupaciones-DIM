import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function TableCommunities() {
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = ['Nombre', 'Tipo de comunidad']
  const data = [];
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Escuelas/Unidades/Comunidades'}
      data={data}
      columns={columns}
      />
    </ThemeProvider>
  )
}