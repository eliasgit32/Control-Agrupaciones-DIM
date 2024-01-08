import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';


export default function TableTotalRegistrations(props) {
  const {data} = props;

  const columns = [
    {
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'cedula',
      label: 'Cédula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`} style={{marginLeft: '5px', marginBottom:'0px'}}>{value}</Link>
        }
      }
    },
    {
      name: 'agrupacion',
      label: 'Agrupación',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'comunidad',
      label: 'Comunidad',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '-10px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'periodo',
      label: 'Período',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '15px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    print: 'false',
    download: false,
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
      title={'Inscripción en agrupaciones'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}