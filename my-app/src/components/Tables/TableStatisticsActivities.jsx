import React from 'react';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsActivities(props) {
  
  const {data} = props;

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
    download: false,
    rowsPerPageOptions: [10, 15, 20],
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
      title={'Estadísticas de actividades'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}