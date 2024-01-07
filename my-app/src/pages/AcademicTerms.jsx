import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import NavBar from '../components/NavBar';
import PageHeader from '../components/PageHeader';
import { createTerm, getTerms } from '../API/terms';
import TermList from '../components/lists/TermList';

export default function AcademicTerms() {
  var lastTerm = '';

  function getNextTerm(lastTerm) {
    //En caso de que no haya período registrado
    if(lastTerm === '') {
      return '2024-15';
    }
    //Dividir período
    const [year, term] = lastTerm.split('-');
  
    // Convertir el nro del período en entero
    const termNumber = parseInt(term);
    const termYear = parseInt(year);   
    if (termNumber === 15) {
      return `${year}-25`;
    } else {
      return `${termYear + 1}-15`;
    }
  }
  
  //Query para añadir períodos
  const queryClient = useQueryClient();
  const addTermMutation = useMutation({
    mutationFn: createTerm,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleSave = () => {
    console.log(lastTerm);
    const newTerm = {
      id: getNextTerm(lastTerm) 
    };
    addTermMutation.mutate(newTerm);
  }

  //Query para solicitar períodos
  const { isLoading, data } = useQuery(['terms'], getTerms)
  if (isLoading) return <div>Cargando...</div>

  if (data === '') return <div>No data</div>
  
  lastTerm = (data[data.length - 1].id);

  return(
    <>
      <NavBar />
      <PageHeader pageTitle='Períodos Académicos' />
      <div className='container mt-4 d-flex justify-content-around' style={{width: '40rem'}}>
        <div className='card' style={{height: '400px', width: '20rem', background: '#787878'}}>
          <div className='card-body' style={{overflowY: 'auto'}}>
            <TermList data={data} />
          </div>
        </div>
        <div className='d-flex align-items-center' style={{heigth: '400px'}}>
          <button 
            className='btn' 
            style={{fontSize: '2rem', width: '20rem', height: '150px', background: '#40b4e5'}}
            onClick={handleSave}
          >
            Agregar Nuevo Período Académico
          </button>
        </div>
      </div>
    </>
  )
}