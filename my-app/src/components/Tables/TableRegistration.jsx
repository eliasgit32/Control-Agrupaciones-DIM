import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableRegistration(props) {

  const {data} = props;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [ 
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
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'carrera',
      label: 'Carrera'
    }
  ];
  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false
  };
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Inscripciones'}
      data={data}
      columns={columns}
      options={options}
      />
    </ThemeProvider>
  );
}