import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation()
  const initialPage = useRef(location.pathname);

  useEffect(() => {
    if(location.pathname !== initialPage.current){
      setIsModalOpen(false);
    }
  }, [location])
  return (
    <Modal
      className="w-48 h-48 max-w-lg absolute p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-slate-300 rounded-md"
      isOpen={isModalOpen}
      onRequestClose={modalHandler}
      >
        
      <ul className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <li><Link to="/profile">My Profile</Link></li>
      <li><button>포스트 작성</button></li>
      <li><button>inside</button></li>
      <li><button>the modal</button></li>
      </ul>
      <div><button onClick={modalHandler}>close</button></div>
      
    </Modal>
  );
};

export default UserModal;
