import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../components/Auth';
import Home from '../components/Home';
import Leisure from '../components/Leisure';
import Lodged from '../components/Lodged';
import Profile from '../components/Profile';
import Restaurant from '../components/Restaurant';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/leisure" element={<Leisure/>} />
      <Route path="/restaurant" element={<Restaurant/>} />
      <Route path="/lodged" element={<Lodged/>} />

      

    </Routes>
  );
};

export default Root;