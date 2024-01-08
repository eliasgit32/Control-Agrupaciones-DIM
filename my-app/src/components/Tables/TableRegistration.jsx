import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Link, useNavigate } from 'react-router-dom';

export default function TableRegistration(props) {

  const navigate = useNavigate();

  const {data,
    setSelectedParticipant,
    setModalVisible,
    type} = props;

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
    <> 
      <MUIDataTable 
      title={(type === 'SignUp' ? 'Inscripciones' : 'Acompañantes')}
      data={data}
      columns={columns}
      options={options}
      />
    </>
    
  );
}