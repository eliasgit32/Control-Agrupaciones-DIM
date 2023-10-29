import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableAllParticipants(props) {

  const data = [];

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [ 
  {
    name:'Cédula',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return <Link to={`/participant/${value}`}>{value}</Link>
      }
    }
  }, 
    'Nombre Completo', 'Fecha Nacimiento', props.community , 'Etapa', 'Correo', 'Correo UCAB', 'Período Ingreso'];
  const options = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'none',
    download: false
  };
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={props.title}
      data={data}
      columns={columns}
      options={options}
      />
    </ThemeProvider>
  )
}