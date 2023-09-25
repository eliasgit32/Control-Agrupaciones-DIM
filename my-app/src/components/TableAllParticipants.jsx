import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCoordinators } from '../API/coordinators';

export default function TableAllParticipants(props) {
  //Importar función de datos de acuerdo al tipo de participante
  var getFunction = null
  switch(props.type){
    case 'Coordinandores': getFunction =  getCoordinators; break;
    case 'Personal':
    default:
      // Aquí va la asignación de la función getStudents
  } 

  //const {isLoading, data} = useQuery(['participants', props.type], getFunction);

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
  // const options = {filterType: 'checkbox'};
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={props.title}
      data={data}
      columns={columns}
      />
    </ThemeProvider>
  )
}