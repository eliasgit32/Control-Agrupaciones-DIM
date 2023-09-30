import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { getGroupActivities } from '../../API/activities';

export default function TableActivities(props) {
  const {groupID} = props;
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [{name: 'nombre'}, 
    {
      name: 'descripcion',
      label: 'Descripción'
    }
  ];

  const options = {filterType: 'checkbox'};
  //Query solicitar actividades de agrupación
  const {isLoading, data} =  useQuery(['activities', groupID], () => getGroupActivities(groupID));

  if (isLoading) return <div>Cargando...</div>

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
        title={'Actividades de la agrupación'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}