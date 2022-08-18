import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Auth from '../components/Auth';
import Beaches from '../components/beaches/Beaches';
import BeachItem from '../components/beaches/BeachItem';
import BeachPost from '../components/beaches/BeachPost';
import BeachReview from '../components/beaches/BeachReview';
import Home from '../components/Home';

import MyFavorites from '../components/user/MyFavorites';
import NaverLogin from '../components/login/NaverLogin';
import Profile from '../components/user/Profile';

import TopNavigation from '../components/UI/TopNavigation';
import { useAppSelector } from '../store/store';


interface RootProps {
  modalHandler : () => void
}

const Root = ({modalHandler}:RootProps) => {
  const userState = useAppSelector((state) => state.user);
  
  
  return (
    <>
    <TopNavigation modalHandler={modalHandler} />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth" element={<Auth/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="myfavorites" element={<MyFavorites/>} />

      <Route path="naver" element={<NaverLogin />} />
      <Route path="beaches" element={<Beaches />}>  
        <Route path=":beachId" element={<BeachItem />}>
        <Route path=":postId" element={<BeachReview/>} />
        <Route path="post" element={<BeachPost />} />
      </Route>
        
      </Route>
    </Routes>
    </>
  );
};

export default Root;