import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInFacebookHandler, signInGoogleHandler } from '../store/slices/UserSlice';
import { useAppDispatch } from '../store/store';
import NaverLogin from './NaverLogin';

const Auth = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const googleLoginHandler = async () => {
   await dispatch(signInGoogleHandler())
    navigate('/')
  }
  const facebookLoginHandler = async () => {
    await dispatch(signInFacebookHandler());
  }
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      
      <div className='flex flex-col gap-4'>
      <button className='border p-4 px-8 border-black font-bold text-sm' onClick={googleLoginHandler}>구글로 로그인</button>
      <button className='border p-4 px-8 border-black font-bold text-sm' onClick={facebookLoginHandler}>페이스북으로 로그인</button>
      <button className='border p-4 px-8 border-black font-bold text-sm'>카카오로 로그인</button>
      <NaverLogin />
      </div>
    </div>
  );
};

export default Auth;  


