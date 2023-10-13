import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createParticipation, deleteParticipation } from '../../API/participations';

export default function TableParticipants(props) {
  //Filas seleccionadas que representen participación
  const [rowsSelected, setRowsSelected] = useState([]);

  const {groupID, activityID, selectedTerm, data} = props;

  //Asignar filas seleccionadas en base a participaciones
  useEffect(() => {
    const NewRowsSelected = data.map((row, index) => {
      if (row.participacion === 1) {
        return index;
      }
      return null;
    }).filter((index) => index !== null);

    setRowsSelected(NewRowsSelected);
  }, [data])

  //Query client para insertar o eliminar participación
  const queryClient = useQueryClient();

  //Mutación insertar participación
  const addParticipationMutation =  useMutation({
    mutationFn: createParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleAddParticipation = (cedula) => {
    const participation = {
      groupID: groupID,
      activityID: activityID,
      cedula: cedula,
      term: selectedTerm
    }
    addParticipationMutation.mutate(participation);
  }

  //Mutación borrar participación
  const deleteParticipationMutation =  useMutation({
    mutationFn: deleteParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleDeleteParticipation = (cedula) => {
    const participation = {
      groupID: groupID,
      activityID: activityID,
      cedula: cedula,
      term: selectedTerm
    }
    // console.log(participation);
    deleteParticipationMutation.mutate(participation);
  }

  //Ejecutar inserción de participación cada vez que 
  //se selecciona una fila
  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    const selectedCedula = currentRowsSelected.map((index) => data[index.index].cedula);
    for(let i = 0; i < rowsSelected.length; i++) {
      if(currentRowsSelected[0].index === rowsSelected[i]){
        handleAddParticipation(selectedCedula);
        return;
      };
    }
    handleDeleteParticipation(selectedCedula[0]); 
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

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
    rowsSelected: rowsSelected,
    onRowSelectionChange: handleRowSelection,
    print: 'false',
  };
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
      title={'Participantes'}
      data={data}
      columns={columns}
      options={options}
      />
    </ThemeProvider>
  );
}