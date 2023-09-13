import React from 'react';
import '../stylesheets/InfoSideBar.css'

export default function InfoSideBar(props) {
  return(
    <div className='info-bar'>
      {props.children}
    </div>
  );
}