import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MUIDataTable from 'mui-datatables';
import { getCommunities } from '../../API/communities';

export default function TableCommunities() {

  const { isLoading, data } = useQuery(['communities'], getCommunities);

  if (isLoading) return <div style={{color: '#343434'}}>Cargando...</div>;

  const columns = [
    {
      name: 'nombre',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{ marginLeft: '15px', marginBottom: '0px' }}>{value}</p>
        }
      }
    },
    {
      name: 'tipo',
      label: 'Tipo de Comunidad',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{ marginLeft: '55px', marginBottom: '0px' }}>{value}</p>
        }
      }
    }
  ];
  
  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
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
  };

  if (data === '') {
    return(
      <MUIDataTable 
        title={'Actividades de la agrupación'}
        data={[]}
        columns={columns}
        options={options}
      />
    )
  }
  
  return(
    <MUIDataTable 
    title={'Escuelas/Unidades/Comunidades'}
    data={data}
    columns={columns}
    options={options}
    />
  )
}