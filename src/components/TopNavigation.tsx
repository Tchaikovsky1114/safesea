import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const TopNavigation = () => {
  const userState = useAppSelector((state) => state.user)
  return (
    <nav className=" flex justify-between items-center h-14">
    <div className="p-10"><Link to="/"><img src="/logo.png" alt="logo" className='w-20' /></Link></div>
    <div className="w-32">
      {!userState.userData.uid && <Link to="/auth">signup/in</Link>}
      </div>
    {userState.userData.uid && <div className="w-32 relative"><Link to="/profile">
      <img className='w-8 rounded-full inline-block' src={userState.userData.userImage} alt={userState.userData.username} />
      <span className='ml-2 text-sm font-bold'>{userState.userData.username}</span>
      </Link></div>}
  </nav>
  );
};

export default TopNavigation;