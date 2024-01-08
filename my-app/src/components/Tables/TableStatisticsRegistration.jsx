import React from 'react';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsRegistration(props) {
  const {data} = props;

  const columns = [
    {
      name: 'semestre',
      label: 'Semestre',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'participantes',
      label: 'Participaciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'inscripciones',
      label: 'Inscripciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'porcentaje',
      label: 'Porcentaje Part.',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '75px', marginBottom:'0px'}}>{value}</p>
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
      title={'Estadísticas de participación global'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}