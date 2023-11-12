import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableAllParticipants(props) {


  const { data } =  props;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [ 
    {
      name:'cedula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`}>{value}</Link>
        }
      }
    }, 
    {
      name:'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'fechaNac',
      label: 'Fecha Nacimiento',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '35px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }, 
    {
      name: 'escuela',
      label: props.community
    },
     'etapa', 'correo', 
    {
      name: 'telefono',
      label: 'Teléfono',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name:'correoUCAB',
      label: 'Correo UCAB'
    }
  ];
  const options = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'none',
    download: false
  };
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={props.type === 'Comunidad' ? `Miembros de Comunidad` : props.type}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}