import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

interface TopNavigationProps {
  modalHandler: () => void;
}

const TopNavigation = ({ modalHandler }: TopNavigationProps) => {
  const userState = useAppSelector((state) => state.user);

  return (
    <>
      <nav className=" flex justify-between items-center shadow-md h-20 w-full">
        <div className="p-10">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="w-16" />
          </Link>
        </div>
        <div className="w-32">
          {!userState.userData.uid && <Link to="/auth">signup/in</Link>}
        </div>
        {userState.userData.uid && (
          <div className="w-32 relative">
            <button onClick={modalHandler}>
              <img
                className="w-8 h-8 rounded-full inline-block"
                src={userState.userData.userImage}
                alt={userState.userData.username}
              />
              <span className="ml-2 text-sm font-bold">
                {userState.userData.username}
              </span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default TopNavigation;
