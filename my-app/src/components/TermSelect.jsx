import React from 'react';
import { getTerms } from '../API/terms';
import { useQuery } from '@tanstack/react-query';

export default function TermSelect() {
  const { isLoading, data } = useQuery(['terms'], getTerms);
  
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  // Si no hay períodos registrados en la bd
  if (data === '') {
    return <div>No data</div>
  }

  return (
    <>
      <select className='form-select text-center w-50' id="selectTerms">
        {data.map((term) => {
          return <option key={term.id} value={term.id}>{term.id}</option>
        })}
      </select>
    </>
  );
}