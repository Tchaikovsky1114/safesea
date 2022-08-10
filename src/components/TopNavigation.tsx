import React from 'react';
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  return (
    <nav className=" flex justify-between items-center h-14">
    <div className="p-10">logo</div>
    <div className="w-32">
      <Link to="/auth">signup/in</Link>
      </div>
  <div className="w-24"><Link to="/profile">userProfile</Link></div>
  </nav>
  );
};

export default TopNavigation;