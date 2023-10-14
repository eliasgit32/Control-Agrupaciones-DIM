import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsRegistration(props) {
  const {data} = props;

  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'semestre',
      label: 'Semestre'
    },
    {
      name: 'participaciones',
      label: 'Participaciones'
    },
    {
      name: 'inscripciones',
      label: 'Inscripciones'
    },
    {
      name: 'porcentaje',
      label: 'Porcentaje Part.'
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
        title={'Estadísticas de participación global'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}