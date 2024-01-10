import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';

export default function TableAllParticipants(props) {


  const { data, setSelectedParticipant, setModalVisible } =  props;

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
    onRowsDelete: () => setModalVisible(true),
    rowsPerPageOptions: [10, 20, 30],
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
      title={props.type === 'Comunidad' ? `Miembros de Comunidad` : props.type}
      data={data}
      columns={props.type === 'Estudiante' ? columnsStudents : 
                (props.type === 'Personal' ? columnsPersonal : columnsCommunity)}
      options={options}
    />
  )
}