import React from 'react';

export default function PersonalDIMList(props) {
  const { data } = props;
  return(
    <>
      <option value={'N/A'}>N/A</option>
      {data.map((personal) => {
        return <option 
          key={personal.cedula}
          value={parseInt(personal.cedula)}
        >
          {personal.nombreCompleto}
        </option>
      })}
    </>
  )
}