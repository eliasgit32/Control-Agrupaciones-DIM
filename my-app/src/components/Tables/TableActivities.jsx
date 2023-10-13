import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export default function TableActivities(props) {
  const [rowsSelected, setRowsSelected] = useState([]);

  const {changeSelectedAct, data} = props;
  
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
    print: 'false',
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
    print: 'false',
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