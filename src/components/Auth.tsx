import React from 'react';

const Auth = () => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      
      <div className='flex flex-col gap-4'>
      <button className='border p-4 px-8 border-black font-bold text-sm'>구글로 로그인</button>
      <button className='border p-4 px-8 border-black font-bold text-sm'>페이스북으로 로그인</button>
      <button className='border p-4 px-8 border-black font-bold text-sm'>카카오로 로그인</button>
      <button className='border p-4 px-8 border-black font-bold text-sm'>네이버로 로그인</button>
      
      </div>
    </div>
  );
};

export default Auth;  