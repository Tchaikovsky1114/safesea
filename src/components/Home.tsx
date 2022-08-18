import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import Banner from './UI/Banner';
import KakaoMap from './KakaoMap';



const Home = () => {
  const userSelector = useAppSelector((state) => state.user);
  console.log(userSelector.userData.username);
  
  return (
    <div className='container mx-auto'>
      
      <Banner />
      <main className="grid grid-cols-2 h-[700px]">
        
        <section className="col-span-2 text-center border p-4 bg-slate-100 ">

        <KakaoMap />
        </section>

      </main>
    </div>
  );
};

export default Home;
