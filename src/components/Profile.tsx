import React, { ChangeEvent, useState } from 'react';
import { updateUserProfileNameHandler } from '../store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const Profile = () => {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [username,setUsername] = useState(userState.userData.username || '')
  const [updateMode,setUpdateMode] = useState(false)


  const updateModeHandler = () => {
    setUpdateMode(prev => !prev);
  }
  const usernameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const submitChangeUsernameHandler = () => {
    dispatch(updateUserProfileNameHandler({
      uid:userState.userData.uid,
      username:username
    }))
    setUpdateMode(prev => !prev);
  }

  return (
    <div className='w-full my-0 mx-auto flex justify-center gap-8 flex-col items-center'>
      <p className='py-4'>{username}'s Profile</p> 
      <div className=''>
      <div className="w-[200px] h-[200px] rounded-full relative"><img className='absolute top-0 rounded-full w-full' src={userState.userData.userImage} alt="image" /></div>
      <div className='py-4'>프로필이미지 <button className='border py-1 px-4'>변경하기</button></div>
      </div>
      <div>
        {!updateMode && <p>닉네임: {username}</p>}
        {updateMode && <>
        <input type="text" value={username} onChange={usernameChangeHandler} />
        <button className='border py-1 px-4' onClick={submitChangeUsernameHandler}>확인</button>
        </>}
        <button className='border py-1 px-4' onClick={updateModeHandler}>변경하기</button>
        </div>
      

      <div className="w-[700px] h-[200px] border border-rose-400">some chart</div>
    </div>
  );
};

export default Profile;