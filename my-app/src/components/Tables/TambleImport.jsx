import React from 'react';
import MUIDataTable from 'mui-datatables';

export default function TableImport(props) {
  const { data, type, traductionMajor } =  props;

  //Conversión de datos en array más ligero
  const lighterData = data.map((participant) => {
    try {
      if(type === 'Estudiante') {
        const newMajor = traductionMajor[participant.MAJOR.slice(0, 3)];
        return {
          CEDULA: participant.CEDULA,
          MAJOR: newMajor,
          NOMBRE_ESTUDIANTE: participant.NOMBRE_ESTUDIANTE,
          ESTU_EMAIL_ADDRESS: participant.ESTU_EMAIL_ADDRESS
        }
      } else if (type === 'Personal') {
        return {
          CEDULA: participant['CI'],
          UnidadEscuela: participant['DEPENDENCIA'],
          NOMBRE: participant['APELLIDOS Y NOMBRES'],
          EMAIL_ADDRESS: participant['CORREOS']
        } 
      }
    } catch (e) {

    }
    
    return null;
  })

  const columnStudent = [
    {
      name: 'CEDULA',
      label: 'Cédula'
    },
    {
      name: 'MAJOR',
      label: 'Escuela'
    },
    {
      name: 'NOMBRE_ESTUDIANTE',
      label: 'Nombre Completo'
    },
    {
      name: 'ESTU_EMAIL_ADDRESS',
      label: 'Correo UCAB'
    },
  ]
  const columnPersonal = [
    {
      name: 'CEDULA',
      label: 'Cédula'
    },
    {
      name: 'UnidadEscuela',
      label: 'Unidad/Escuela'
    },
    {
      name: 'NOMBRE',
      label: 'Nombre Completo'
    },
    {
      name: 'EMAIL_ADDRESS',
      label: 'Correo UCAB'
    },
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
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
  }
  
  return(
    <MUIDataTable 
      title={'Datos a importar'}
      data={lighterData}
      columns={type === 'Estudiante' ? columnStudent : columnPersonal}
      options={options}
    />
  )
}