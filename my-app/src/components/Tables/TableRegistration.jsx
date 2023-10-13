import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmOperation from '../modals/ConfirmOperation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroupRegistration } from '../../API/participants';

export default function TableRegistration(props) {

  const navigate = useNavigate();

  const {data, 
    groupID, 
    selectedTerm, 
    setSelectedParticipant,
    setModalVisible} = props;

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
          return <Link 
            onClick={() => navigate(`/participant/${value}`)} 
            data-bs-dismiss='modal'
          >
            {value}
          </Link>
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
    onRowSelectionChange: handleRowSelection,
    onRowsDelete: () => {
      setModalVisible(true);
    },
    print: 'false',
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
    </>
    
  );
}