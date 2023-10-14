import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';


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
      label: 'Cédula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`}>{value}</Link>
        }
      }
    },
    {
      name: 'agrupacion',
      label: 'Agrupación'
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
        title={'Inscripción en agrupaciones'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}