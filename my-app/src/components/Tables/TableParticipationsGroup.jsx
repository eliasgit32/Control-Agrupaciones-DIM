import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';

export default function TableParticipationsGroup(props) {
  const {data, groupID} = props;

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
          return <Link to={`/participant/${value}`} style={{marginLeft: '10px'}}>{value}</Link>
        }
      }
    },
    {
      name: 'comunidad',
      label: 'Comunidad',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '20px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'periodo',
      label: 'Período',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '20px', marginBottom:'0px'}}>{value}</p>
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
      title={'Participación en actividades'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}