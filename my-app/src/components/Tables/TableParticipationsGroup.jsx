import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableParticipationsGroup(props) {
  const {data} = props;
  
  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'nombre',
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
      name: 'comunidad',
      label: 'Comunidad'
    },
    {
      name: 'periodo',
      label: 'Período'
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
        title={'Participación en actividades'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}