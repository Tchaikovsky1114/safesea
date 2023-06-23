import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import ImageButton from '../common/button/ImageButton';
import SmallImageCard from '../common/card/SmallImageCard';

interface TopNavigationProps {
  modalHandler: () => void;
}

const TopNavigation = ({ modalHandler }: TopNavigationProps) => {
  const userState = useAppSelector((state) => state.user);

  return (
      <nav className=" flex justify-between items-center shadow-md h-20 w-full">
          <Link className='p-4' to="/">
            <SmallImageCard
            src='/logo.png'
            alt="로고"
            text=''
            height={40}
            width={40}
            imageStyle='w-16 h-16 rounded-[9999px]'
            />
          </Link>
          {
            !userState.userData.uid 
            ? <Link to="/auth">signup/in</Link>
            : 
            <ImageButton
              onClick={modalHandler}
              src={userState.userData.userImage}
              text={userState.userData.username}
              addStyle='text-sm font-bold border-0'
              imageStyle='w-8 h-8 rounded-full inline-block'
            />
          }
      </nav>
  );
};

export default TopNavigation;
