import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsActivities(props) {
  
  const {data} = props;

  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'nombre',
      label: 'Actividad'
    },
    {
      name: 'descripcion',
      label: 'Descripción Actividad'
    },
    {
      name: 'participacion',
      label: 'Participación',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '45px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'partInsc',
      label: 'Part/Insc',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '45px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    print: 'false',
    download: false
  }

  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Estadísticas de actividades'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}