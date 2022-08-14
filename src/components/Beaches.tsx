import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import BeachItem from './BeachItem';

const Beaches = () => {
  
  return (
    <div>
      
      <Outlet />
    </div>
  );
};

export default Beaches;