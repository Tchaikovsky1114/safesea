import {  signOut } from 'firebase/auth';
import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

Modal.setAppElement('#top-modal');

interface UserModalProps {
  isModalOpen: boolean;
  modalHandler: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
  },
};
const UserModal = ({ isModalOpen, modalHandler,setIsModalOpen }: UserModalProps) => {
  const locate = useLocation()
  const initialPage = useRef(locate.pathname);
  const navigate = useNavigate()

  const signOutHandler = async () => {
    
    await signOut(auth)
    localStorage.clear()
    location.reload()
    navigate('/')
    console.log('signOut')
  }

  useEffect(() => {
    if(locate.pathname !== initialPage.current){
      setIsModalOpen(false);
    }
  }, [locate])

  return (
    <Modal
      className="w-[480px] h-[360px] max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-slate-300 rounded-t-md"
      isOpen={isModalOpen}
      onRequestClose={modalHandler}
      >
        
      <ul className='w-full h-full flex flex-col justify-center items-center space-y-4 font-bold'>
      <li className='hover:text-white hover:bg-orange-500 transition-all duration-150 w-full text-center h-14 flex items-center justify-center'><Link to="/profile">My Profile</Link></li>
      <li className='hover:text-white hover:bg-orange-500 transition-all duration-150 w-full text-center h-14 flex items-center justify-center'><button>포스트 작성</button></li>
      <li className='hover:text-white hover:bg-orange-500 transition-all duration-150 w-full text-center h-14 flex items-center justify-center'><button>My Favorite Beaches</button></li>
      <li className='hover:text-white hover:bg-orange-500 transition-all duration-150 w-full text-center h-14 flex items-center justify-center'><button onClick={signOutHandler}>로그아웃</button></li>
      </ul>
      <div className="bg-gray-200 w-full h-16 rounded-b-md relative">
        <button onClick={modalHandler} className="h-3/4 w-1/3 border absolute inset-y-2 right-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-orange-500">닫기</button>
        </div>
      
    </Modal>
  );
};

export default UserModal;
