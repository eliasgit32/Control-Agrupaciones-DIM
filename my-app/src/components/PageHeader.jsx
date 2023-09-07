import React from 'react';

export default function PageHeader(props) {
  return(
    <div className='page-header text-center'>
      <div className='row'>
        <div className='col-lg-8 col-md-7 col-sm-6'></div>
        <h1>{props.pageTitle}</h1>
      </div>
    </div>
  );
}