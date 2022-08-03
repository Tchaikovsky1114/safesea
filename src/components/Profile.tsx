import React from 'react';

const Profile = () => {
  return (
    <div className='w-full my-0 mx-auto flex justify-center gap-8 flex-col items-center'>
      <p className='py-4'>OOO's Profile</p> 
      <div className=''>
      <div className="w-[200px] h-[200px] border border-black rounded-full"><img src="qwfqfq" alt="image" /></div>
      <div className='py-4'>프로필이미지 <button className='border p-2 px-4'>변경하기</button></div>
      </div>
      <div>Nickname: OOO <button className='border p-2 px-4'>변경하기</button></div>
      

      <div className="w-[700px] h-[200px] border border-rose-400">some chart</div>
    </div>
  );
};

export default Profile;