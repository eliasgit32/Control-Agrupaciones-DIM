import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableAllParticipants(props) {
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
  const data = [
    ['27158735', 'Peñalver Butto, Elias José', '28/04/1999', 'Ing. Informática', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['55555555', 'Martínez Gómez, Luisa Fernanda', '28/04/1999', 'Com. Social', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['66666666', 'Gómez Ramírez, Andrés Felipe', '28/04/1999', 'Contaduría', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['77777777', 'Ramírez Torres, Sofía Alejandra', '28/04/1999', 'Administración', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['27158735', 'Peñalver Butto, Elias José', '28/04/1999', 'Ing. Informática', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['55555555', 'Martínez Gómez, Luisa Fernanda', '28/04/1999', 'Com. Social', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['66666666', 'Gómez Ramírez, Andrés Felipe', '28/04/1999', 'Contaduría', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['77777777', 'Ramírez Torres, Sofía Alejandra', '28/04/1999', 'Administración', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['27158735', 'Peñalver Butto, Elias José', '28/04/1999', 'Ing. Informática', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['55555555', 'Martínez Gómez, Luisa Fernanda', '28/04/1999', 'Com. Social', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['66666666', 'Gómez Ramírez, Andrés Felipe', '28/04/1999', 'Contaduría', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15'],
    ['77777777', 'Ramírez Torres, Sofía Alejandra', '28/04/1999', 'Administración', 'Familiarización', 'elias@gmail.com', 'ejpenalver@ucab.edu.ve', '2018-15']
  ];
  // const options = {filterType: 'checkbox'};
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Participantes'}
      data={data}
      columns={columns}
      />
    </ThemeProvider>
  )
}