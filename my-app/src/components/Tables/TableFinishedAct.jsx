import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link, useNavigate } from 'react-router-dom';

export default function TableFinishedAct(props) {

  const { data } = props;
  const navigate =  useNavigate();

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
    selectableRows: 'none',
    download: false,
    rowsPerPageOptions: [10],
    textLabels: {
      body: {
        noMatch: 'Registros no encontrados',
        toolTip: 'Filtrar'
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    }
  }
  
  return(
    <MUIDataTable 
      data={data}
      columns={columns}
      options={options}
      title={'Actividades Finalizadas'}
    />
  )
}