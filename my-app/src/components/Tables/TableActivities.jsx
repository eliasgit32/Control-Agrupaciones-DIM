import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';

export default function TableActivities(props) {
  const [rowsSelected, setRowsSelected] = useState([]);

  const {changeSelectedAct, data} = props;

  const columns = [{name: 'nombre'}, 
    {
      name: 'descripcion',
      label: 'Descripción'
    }
  ];

  const options1 = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'multiple',
    download: false
  };

  useEffect(() => {
    const NewRowsSelected = data.map((row, index) => {
      if (row.asignado === 1) {
        return index;
      }
      return null;
    }).filter((index) => index !== null);

    setRowsSelected(NewRowsSelected);
  }, [data])

  if (data === '') {
    return(
      <MUIDataTable 
        title={'Actividades de la agrupación'}
        data={[]}
        columns={columns}
        options={options1}
      />
    )
  }

  const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
    const activityIds = allRowsSelected.map((index) => data[index.index].id);
    changeSelectedAct(activityIds);
  };

  const options2 = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'multiple',
    selectableRowsHeader: false,
    rowsSelected: rowsSelected,
    selectToolbarPlacement: 'none',
    onRowSelectionChange: handleRowSelection,
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
  };

  return(
    <MUIDataTable 
      title={'Actividades de la agrupación'}
      data={data}
      columns={columns}
      options={options2}
    />
  )
}