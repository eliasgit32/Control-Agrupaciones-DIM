import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCommunities } from '../../API/communities';

export default function TableCommunities() {
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const { isLoading, data } = useQuery(['communities'], getCommunities);

  if (isLoading) return <div>Cargando...</div>;

  const columns = [{
    name:'nombre',
  }, {
    name:'tipo',
    label: 'Tipo de Comunidad'
  }];
  const options = {filterType: 'checkbox'};

  if (data === '') {
    return(
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable 
          title={'Actividades de la agrupación'}
          data={[]}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    )
  }
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Escuelas/Unidades/Comunidades'}
      data={data}
      columns={columns}
      options={options}
      />
    </ThemeProvider>
  )
}