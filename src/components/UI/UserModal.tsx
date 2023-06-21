import {  signOut } from 'firebase/auth';
import React, { useCallback, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import UserModalItem from './UserModalItem';

Modal.setAppElement('#top-modal');

interface UserModalProps {
  isModalOpen: boolean;
  modalHandler: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal = ({ isModalOpen, modalHandler,setIsModalOpen }: UserModalProps) => {
  const locate = useLocation()
  const initialPage = useRef(locate.pathname);
  const navigate = useNavigate()

  const signOutHandler = useCallback( async() => {
    await signOut(auth)
    localStorage.clear() 
    navigate('/')
    location.reload()
  },[])

  useEffect(() => {
    if(locate.pathname !== initialPage.current){
      setIsModalOpen(false);
    }
  }, [locate])

  return (
    <Modal
      className="container w-[90%] border-4 border-indigo-200 md:border-none max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-slate-300 rounded-t-md"
      isOpen={isModalOpen}
      onRequestClose={modalHandler}
      >
      <ul className='w-full h-full flex flex-col justify-center items-center space-y-2 md:space-y-4 font-bold'>
      <UserModalItem><Link to="/profile">My Profile</Link></UserModalItem>
      <UserModalItem><button>포스트 작성</button></UserModalItem>
      <UserModalItem><Link to="/myfavorites">My Favorite Beaches</Link></UserModalItem>
      <UserModalItem><button onClick={signOutHandler}>로그아웃</button></UserModalItem>
      </ul>
      <div className="bg-gray-200 w-full h-16 md:rounded-b-md relative">
        <button onClick={modalHandler} className="h-3/4 w-1/3 border absolute inset-y-2 right-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-orange-500">닫기</button>
      </div>
      
    </Modal>
  );
};

export default UserModal;
