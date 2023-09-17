import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableParticipants() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = ['Participación', 
  {
    name:'Cédula',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return <Link to={`/participants/${value}`}>{value}</Link>
      }
    }
  }, 
    'Nombre', 'Etapa'];
  const data = [
    ['SI', '27158735', 'Peñalver Butto, Elias José', 'Familiarización'],
    ['SI', '55555555', 'Martínez Gómez, Luisa Fernanda', 'Familiarización'],
    ['NO', '66666666', 'Gómez Ramírez, Andrés Felipe', 'Familiarización'],
    ['SI', '77777777', 'Ramírez Torres, Sofía Alejandra', 'Familiarización'],
    ['SI', '27158735', 'Peñalver Butto, Elias José', 'Familiarización'],
    ['SI', '55555555', 'Martínez Gómez, Luisa Fernanda', 'Familiarización'],
    ['NO', '66666666', 'Gómez Ramírez, Andrés Felipe', 'Familiarización'],
    ['SI', '77777777', 'Ramírez Torres, Sofía Alejandra', 'Familiarización'],
    ['SI', '27158735', 'Peñalver Butto, Elias José', 'Familiarización'],
    ['SI', '55555555', 'Martínez Gómez, Luisa Fernanda', 'Familiarización'],
    ['NO', '66666666', 'Gómez Ramírez, Andrés Felipe', 'Familiarización'],
    ['SI', '77777777', 'Ramírez Torres, Sofía Alejandra', 'Familiarización']
  ];
  const options = {filterType: 'checkbox'};
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Participantes'}
      data={data}
      columns={columns}
      options={options}
      />
    </ThemeProvider>
  );
}