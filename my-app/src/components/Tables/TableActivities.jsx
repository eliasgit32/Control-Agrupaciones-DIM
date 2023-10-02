import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { getGroupActivities } from '../../API/activities';


export default function TableActivities(props) {

  const {groupID, selectedTerm, changeSelectedAct} = props;
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

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
    // rowsSelected: [1]
    // onRowsSelectionChange: handleRowSelection,
    // isSelected: isSelected
  };

  //Query solicitar actividades de agrupación
  const {isLoading, data} =  useQuery(['activities', groupID, selectedTerm], 
    () => getGroupActivities(groupID, selectedTerm));

  if (isLoading) return <div>Cargando...</div>

  if (data === '') {
    return(
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable 
          title={'Actividades de la agrupación'}
          data={[]}
          columns={columns}
          options={options1}
        />
      </ThemeProvider>
    )
  }

  //Definir si la fila es seleccionada en base al atributo "asignado"
  const rowsSelected = data.map((row, index) => {
    if (row.asignado === 1) {
      return index;
    }
    return null;
  }).filter((index) => index !== null);

  const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
    const activityIds = allRowsSelected.map((index) => data[index.index].id);
    changeSelectedAct(activityIds);
    // console.log(activityIds);
  };

  const options2 = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'multiple',
    selectableRowsHeader: false,
    rowsSelected: rowsSelected,
    onRowSelectionChange: handleRowSelection
  };

  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={'Actividades de la agrupación'}
        data={data}
        columns={columns}
        options={options2}
      />
    </ThemeProvider>
  )
}