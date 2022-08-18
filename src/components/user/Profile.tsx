import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfileImageHandler, updateUserProfileNameHandler } from '../../store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Profile = () => {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [username,setUsername] = useState(userState.userData.username || '')
  const [updateMode,setUpdateMode] = useState(false)
  const [selectedImage,setSelectedImage] = useState<string | null>('')
  const navigate = useNavigate();
  const filePickerRef = useRef<HTMLInputElement>(null)
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
  const addImageHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files) {
      const currentFile = e.currentTarget.files[0]

      let fileUrl:string = '';
      
      
      let fileReader = new FileReader();
      fileReader.onload = () => {
        fileUrl = fileReader.result as string;
        setSelectedImage((prev) => fileUrl);
      }
      fileReader.readAsDataURL(currentFile);
    }
  }
  console.log(selectedImage);
  const filePickerHandler = () => {
    filePickerRef.current?.click();
  }
  const deleteSelectedImageHandler = () => {
    setSelectedImage(null);
  }
  const changeProfileImageHandler = () => {
    dispatch(updateUserProfileImageHandler({
      uid:userState.userData.uid,
      userImage:selectedImage!
    }))
    setSelectedImage(null);
  }
  return (
    <div className='w-full my-0 mx-auto flex justify-center gap-8 flex-col items-center'>
      <p className='py-4'>{username}'s Profile</p> 
      <div className=''>
      <div className="w-[200px] h-[200px] rounded-full relative"><img className='absolute top-0 rounded-full w-full h-full' src={userState.userData.userImage} alt="image" /></div>
      {selectedImage &&
      <>
      
      <div className='border bg-sky-400 bg-opacity-5 p-4'>
        <img className='w-24 h-24 mx-auto rounded-full border border-slate-400' src={selectedImage} />
      </div>
      <h3 className='text-center font-bold pb-2'>이 사진으로 변경할까요?</h3>
      <div className='flex items-center justify-center pt-2 gap-2'>
      <button className='border py-1 px-4' onClick={changeProfileImageHandler}>네!</button>
      <button className='border py-1 px-4' onClick={deleteSelectedImageHandler}>아니요</button>
      </div>
      </>}
      <div className='py-4'><button className='border py-1 px-4' onClick={filePickerHandler}>프로필 사진 변경하기</button></div>
      <input type="file" hidden ref={filePickerRef} onChange={addImageHandler} />
      </div>
      <div>
        {!updateMode && <p>닉네임: {username}</p>}
        {updateMode && <>
        <input type="text" value={username} onChange={usernameChangeHandler} />
        <button className='border py-1 px-4' onClick={submitChangeUsernameHandler}>확인</button>
        </>}
        <button className='border py-1 px-4' onClick={updateModeHandler}>변경하기</button>
        </div>
      

      <button className='py-10 w-full border bg-rose-600 text-white' onClick={() => navigate("/")}>메인으로</button>
    </div>
  );
};

export default Profile;