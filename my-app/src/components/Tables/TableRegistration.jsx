import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ConfirmOperation from '../Modals/ConfirmOperation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroupRegistration } from '../../API/participants';

export default function TableRegistration(props) {

  const {data, groupID, selectedTerm} = props;

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [modalVisible, setModalVisible] =  useState(false);

  const queryClient = useQueryClient();
  
  //Mutación borrar inscripción
  const deleteResgitrationMutation =  useMutation({
    mutationFn: deleteGroupRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columns = [ 
    {
      name: 'cedula',
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
      name: 'comunidad',
      label: 'Comunidad'
    }
  ];

  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    const selectedCedula = currentRowsSelected.map((index) => data[index.index].cedula);
    setSelectedParticipant(selectedCedula[0])
  }

  const options = {
    filterType: 'checkbox',
    selectableRowsHeader: false,
    selectableRows: 'single',
    // selectToolbarPlacement: 'none',
    onRowSelectionChange: handleRowSelection,
    onRowsDelete: () => {
      setModalVisible(true);
    }
  };
  
  return(
    <> 
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable 
        title={'Inscripciones'}
        data={data}
        columns={columns}
        options={options}
        />
      </ThemeProvider>
      <ConfirmOperation 
        operation={() => 
          {
            deleteResgitrationMutation.mutate({cedula: selectedParticipant, groupID: groupID, term: selectedTerm})
          }
        }
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
    
  );
}