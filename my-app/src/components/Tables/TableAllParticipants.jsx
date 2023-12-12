import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function TableAllParticipants(props) {


  const { data, setSelectedParticipant, setModalVisible } =  props;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  const columnsStudents = [ 
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
      name:'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'escuela',
      label: props.community
    },
    {
      name: 'etapa',
      label: 'Etapa'
    },
    {
      name:'correoUCAB',
      label: 'Correo UCAB'
    }
  ];

  const columnsPersonal = [
    {
      name:'cedula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`}>{value}</Link>
        }
      }
    }, 
    {
      name:'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name:'tipo',
      label: 'Nómina'
    },
    {
      name: 'escuela',
      label: props.community
    },
    {
      name:'correoUCAB',
      label: 'Correo UCAB'
    }
  ]

  const columnsCommunity = [
    {
      name:'cedula',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Link to={`/participant/${value}`}>{value}</Link>
        }
      }
    }, 
    {
      name:'nombreCompleto',
      label: 'Nombre Completo'
    },
    {
      name: 'escuela',
      label: props.community,
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
     'correo', 
    {
      name: 'telefono',
      label: 'Teléfono',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }
  ]

  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    const selectedCedula = currentRowsSelected.map((index) => data[index.index].cedula);
    setSelectedParticipant(selectedCedula[0])
  }

  const options = {
    filterType: 'checkbox', 
    print: 'false',
    selectableRows: 'single',
    download: false,
    onRowSelectionChange: handleRowSelection,
    onRowsDelete: () => setModalVisible(true)
  };
  
  return(
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable 
        title={props.type === 'Comunidad' ? `Miembros de Comunidad` : props.type}
        data={data}
        columns={props.type === 'Estudiante' ? columnsStudents : 
                  (props.type === 'Personal' ? columnsPersonal : columnsCommunity)}
        options={options}
      />
    </ThemeProvider>
  )
}