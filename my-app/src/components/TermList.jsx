import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTerm } from '../API/terms';
import { useEffect } from 'react';

export default function TermList(props) {
  //Manejar período seleccionado por el usuario
  const [selectedTerm, setSelectedTerm] = useState('');

  const changeSelectedTerm = e => {
    setSelectedTerm(e.target.value);
    handleUpdate(e.target.value)
  }

  // useEffect(() => {
  //   handleUpdate(selectedTerm)
  // }, [selectedTerm]);

  const {data} = props;

  //Seleccionar el período guardado como actual al recibir
  //el arreglo de datos
  useEffect(() => {
    const currentTerm = data.find(term => term.actual === 1);
    if (currentTerm) {
      setSelectedTerm(currentTerm.id);
    }
  }, [data]);

  const queryClient = useQueryClient();

  //Mutacion actualizar período
  const updateTermMutation = useMutation({
    mutationFn: updateTerm,
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const handleUpdate = (selectedTerm) => {
    const term = {
      id: selectedTerm,
      current: 1
    }
    updateTermMutation.mutate(term);
  }

  return(
    <div className='radio-container' >
      {data.map((term) => {
        return(
          <div key={term.id} style={{borderBottom: '1px solid #222'}}>
            <input 
              type='radio' 
              id={term.id}
              name='terms'
              value={term.id}
              onChange={changeSelectedTerm}
              checked={ selectedTerm === term.id }
              style={{transform: 'scale(1.7)'}}
            />
            <label htmlFor={term.id} style={{marginLeft: '2rem'}}>{term.id}</label>
          </div>
        )
      })}
    </div>
  )
}