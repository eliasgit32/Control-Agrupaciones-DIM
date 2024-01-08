import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateParticipation } from '../../API/participations';

var newRowsSelected = [];

export default function TableParticipants(props) {
  //Filas seleccionadas que representen participación
  const [rowsSelectedData, setRowsSelectedData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const {groupID, activityID, selectedTerm, data} = props;

  //Asignar filas seleccionadas en base a participaciones
  useEffect(() => {
    const NewRowsSelected = data.map((row, index) => {
      if (row.participacion === 1) {
        return index;
      }
      return null;
    }).filter((index) => index !== null);

    setRowsSelectedData(NewRowsSelected);
    setDataChanged(false);
  }, [data])

  //Query client para insertar o eliminar participación
  const queryClient = useQueryClient();

  //Mutación insertar participación
  const updateParticipationMutation =  useMutation({
    mutationFn: updateParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleCancel = () => {
    newRowsSelected = [];
    setDataChanged(false);
  };

  const handleSave = () => {
    const participants = newRowsSelected.map(index => {
      return data[index].cedula;
    })

    updateParticipationMutation.mutate({groupID, activityID, term: selectedTerm, participants});
  };

  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    // Asignar nuevo arreglo de filas seleccionadas
    newRowsSelected = [...rowsSelected];    

    //Se ordenan los elementos de ambos arreglos para comparar adecuadamente
    if(JSON.stringify(rowsSelectedData.sort()) === JSON.stringify(newRowsSelected.sort())) 
      setDataChanged(false);
    else setDataChanged(true);
  };

  const columns = [
    {
      name:'cedula',
      label: 'Cédula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`}>{value}</Link>
        }
      }
    }, 
    {
      name: 'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'comunidad'
    }
  
  ];
    
  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    selectToolbarPlacement: 'none',
    rowsSelected: (!dataChanged ? 
      rowsSelectedData : newRowsSelected),
    onRowSelectionChange: handleRowSelection,
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
  
  return(
    <>
    <div className='mt-3'></div>
      <MUIDataTable 
      title={'Participantes'}
      data={data}
      columns={columns}
      options={options}
      />

       {/* botones guardar cambios registro de participación */}
      <div className='text-center'>
        <button
          type='button'
          className={!dataChanged ?
            'btn btn-danger disabled' : 'btn btn-danger'}
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          type='button'
          className={!dataChanged ?
            'btn btn-success disabled' : 'btn btn-success'}
          onClick={handleSave}
        >
          Guardar Cambios
        </button>
      </div>
    </>
    
  );
}