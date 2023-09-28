import React, { useState } from 'react';

export default function TermList(props) {
  //Manejar período seleccionado por el usuario
  const [selectedTerm, setSelectedTerm] = useState('');
  const changeSelectedTerm = e => setSelectedTerm(e.target.value);

  const {data} = props;

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