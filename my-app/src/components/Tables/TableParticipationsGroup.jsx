import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';

export default function TableParticipationsGroup(props) {
  const {data, groupID} = props;
  
  //Aplicar tema oscuro a la tabla
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'nombre',
      label: 'Actividades',
      options: {
        customBodyRender: (value, tableMeta) => {
          return <Link to={`/group/${groupID}/${data[tableMeta.rowIndex].idAct}/${tableMeta.rowData[4]}`} >{value}</Link>
        }
      }
    },
    {
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
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
      name: 'comunidad',
      label: 'Comunidad'
    },
    {
      name: 'periodo',
      label: 'Período'
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
        title={'Participación en actividades'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}