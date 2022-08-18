import { collection, doc, DocumentData, getDoc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import { useAppSelector } from '../../store/store';
import KakaoMap from '../KakaoMap';

interface BeachTypes {
  beach_knd: "모래"
  beach_len: number
  beach_wid: number
  gugun_nm:string
  lat: string
  likes:string
  link_tel:string
  lon: string
  sido_nm: string
  sta_nm:string
  data: () => DocumentData
}


let min = Math.ceil(1);
let max = Math.floor(20);
const nb = Math.ceil(Math.random() * (max - min))
// src="/beach${nb}.jpg" 

const MyFavorites = () => {
  const [myFavoriteBeaches,setMyFavoriteBeaches] = useState<DocumentData>([])
  const userState = useAppSelector(state => state.user.userData)
  
  useEffect(() => {
    const fetchFb = async() => {
      const beachesQuery = collection(db,'beaches');
      const q = query(beachesQuery,where("likes",'array-contains',userState.email))
      const beaches = await getDocs(q)
      setMyFavoriteBeaches(beaches.docs)
      // console.log(beaches.map(item => item.data()));
    }
    fetchFb()
    
  }, [])
  
  
  return (
    <div className='mx-auto px-4 w-full'>
    <h2 className='mt-20 mb-4 font-bold w-full border-b-2 border-slate-200 pb-2'>내가 좋아하는 해변 </h2>
    <div className='flex flex-col gap-4 md:flex-row md:flex-wrap'>
      {myFavoriteBeaches.map((beach:BeachTypes,index:number) =>
      <ul className='border p-8 bg-sky-100 rounded-md mx-auto md:min-w-[360px] w-full' key={beach.data().sta_nm}>
      <Link className='text-sm font-bold flex flex-col justify-center space-y-4' to={`/beaches/${encodeURIComponent(beach.data().sta_nm)}`}><li className='text-center'>{beach.data().sta_nm} 해수욕장</li>
      <li><img className='w-24 h-24 rounded-full mx-auto' src={`/beach${index + 1}.jpg`} alt=""/></li>
      <li className='text-center text-sm py-2'>{beach.data().sido_nm} {beach.data().gugun_nm ? beach.data().gugun_nm : "정보 없음"}</li>
      <li className='text-xs'>해수욕장의 길이: {beach.data().beach_len ? beach.data().beach_len : "정보 없음"}M</li>
      <li className='text-xs'>해수욕장의 폭: {beach.data().beach_wid ? beach.data().beach_wid : "정보 없음"}M</li>
      <li className='text-xs'>구급전화: {beach.data().link_tel ? beach.data().link_tel : "정보 없음"}</li>
      </Link>
      </ul>
      )}
    </div>
    </div>
  );
};

export default MyFavorites;