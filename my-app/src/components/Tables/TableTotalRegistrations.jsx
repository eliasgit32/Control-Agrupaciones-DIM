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
          return <Link to={`/participant/${value}`} style={{marginLeft: '5px', marginBottom:'0px'}}>{value}</Link>
        }
      }
    },
    {
      name: 'agrupacion',
      label: 'Agrupación',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'comunidad',
      label: 'Comunidad',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'periodo',
      label: 'Período',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '15px', marginBottom:'0px'}}>{value}</p>
        }
      }
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