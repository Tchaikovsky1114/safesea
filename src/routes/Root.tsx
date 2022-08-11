import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Auth from '../components/Auth';
import Home from '../components/Home';
import Leisure from '../components/Leisure';
import Lodged from '../components/Lodged';
import NaverLogin from '../components/NaverLogin';
import Profile from '../components/Profile';
import Restaurant from '../components/Restaurant';
import TopNavigation from '../components/TopNavigation';
import { useAppSelector } from '../store/store';

const Root = () => {
  const userState = useAppSelector((state) => state.user);
  
  console.log(userState);
  return (
    <>
    <TopNavigation />
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="auth" element={<Auth/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="leisure" element={<Leisure/>} />
      <Route path="restaurant" element={<Restaurant/>} />
      <Route path="lodged" element={<Lodged/>} />
      <Route path="naver" element={<NaverLogin />} />
    </Routes>
    </>
  );
};

export default Root;