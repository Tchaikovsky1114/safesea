import React from 'react';
import { Link } from 'react-router-dom';
import KakaoMap from './KakaoMap';

const Home = () => {

  return (
    <div>
      <nav className=" flex justify-between items-center h-14">
        <div className="p-10">logo</div>
        <div className="w-32">
          <Link to="/auth">
          signup/in
          </Link></div>
        <div className="w-24"><Link to="/profile">userProfile</Link></div>
      </nav>

      <main className="grid grid-cols-2 h-[700px]">
        
        <section className="col-span-2 text-center border p-4 bg-slate-100 ">
        <div className="w-full h-[500px] text-center">
        <KakaoMap />
        </div>
        
        </section>

      </main>
    </div>
  );
};

export default Home;
