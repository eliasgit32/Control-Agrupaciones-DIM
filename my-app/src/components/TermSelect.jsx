import React from 'react';
import { getTerms } from '../API/terms';
import { useQuery } from '@tanstack/react-query';

export default function TermSelect(props) {

  const { selectedTerm, setSelectedTerm } = props;

  const changeTerm = e => setSelectedTerm(e.target.value);

  const { isLoading, data } = useQuery(['terms'], getTerms);
  
  if (isLoading) return <div style={{color: '#343434'}}>Cargando...</div>;
  
  // Si no hay períodos registrados en la bd
  if (data === '') return <div>No data</div>
  

  return (
    <>
      <select 
        className='form-select text-center w-50' 
        id="selectTerms"
        onChange={changeTerm}
        value={selectedTerm}
      >
        {data.map((term) => {
          return <option key={term.id} value={term.id}>{term.id}</option>
        })}
      </select>
    </>
  );
}