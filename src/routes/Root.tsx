import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Auth from '../components/Auth';
import Beaches from '../components/Beaches';
import BeachItem from '../components/BeachItem';
import BeachPost from '../components/BeachPost';
import BeachReview from '../components/BeachReview';
import Home from '../components/Home';
import Leisure from '../components/Leisure';
import Lodged from '../components/Lodged';
import NaverLogin from '../components/NaverLogin';
import Profile from '../components/Profile';
import Restaurant from '../components/Restaurant';
import TopNavigation from '../components/TopNavigation';
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
      <Route path="leisure" element={<Leisure/>} />
      <Route path="restaurant" element={<Restaurant/>} />
      <Route path="lodged" element={<Lodged/>} />
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