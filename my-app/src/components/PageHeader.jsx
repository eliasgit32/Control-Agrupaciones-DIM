import React from 'react';

export default function PageHeader(props) {
  return(
    <div className='page-header text-center'>
      <div className='text-center'>
        <h1 style={{padding: 0, width: '100%'}}>{props.pageTitle}</h1>
      </div>
    </div>
  );
}