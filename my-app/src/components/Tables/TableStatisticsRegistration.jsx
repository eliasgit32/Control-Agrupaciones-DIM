import React from 'react';
import MUIDataTable from 'mui-datatables';

export default function TableStatisticsRegistration(props) {
  const {data} = props;

  const columns = [
    {
      name: 'semestre',
      label: 'Semestre',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'participantes',
      label: 'Participaciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'inscripciones',
      label: 'Inscripciones',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '25px', marginBottom:'0px'}}>{value}</p>
        }
      }
    },
    {
      name: 'porcentaje',
      label: 'Porcentaje Part.',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <p style={{marginLeft: '75px', marginBottom:'0px'}}>{value}</p>
        }
      }
    }
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    print: 'false',
    download: false
  }

  return(
    <MUIDataTable 
      title={'Estadísticas de participación global'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}