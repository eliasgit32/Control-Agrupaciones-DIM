import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

export default function TableFinishedAct(props) {

  const { data } = props;
  const navigate =  useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [
    {
      name: 'agrupacion',
      label: 'Agrupación',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '20px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'actividad',
      label: 'Actividad',
      options: {
        customBodyRender: (value, tableMeta) => {
          return <Link onClick={() => navigate(`/group/${data[tableMeta.rowIndex].agrupacionID}` +
          `/${data[tableMeta.rowIndex].actividadID}/${tableMeta.rowData[2]}`)}
          data-bs-dismiss='modal'>
            {value}
          </Link>
        }
      }
    },
    {
      name: 'periodo',
      label: 'Periodo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '20px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'fechaFin',
      label: 'Finalización',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }
  ]
  
  const options = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'none'
  }
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
          data={data}
          columns={columns}
          options={options}
        />
    </ThemeProvider>
  )
}