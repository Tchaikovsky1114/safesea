import { collection,DocumentData,getDocs,query,where } from 'firebase/firestore';
import  { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useAppSelector } from '../../store/store';
import FavoriteBeachCard from './FavoriteBeachCard';

export interface BeachTypes {
  beach_knd: '모래';
  beach_len: number;
  beach_wid: number;
  gugun_nm: string;
  lat: string;
  likes: string;
  link_tel: string;
  lon: string;
  sido_nm: string;
  sta_nm: string;
  data: () => DocumentData;
}

let min = Math.ceil(1);
let max = Math.floor(20);
const nb = Math.ceil(Math.random() * (max - min));
// src="/beach${nb}.jpg"

const MyFavorites = () => {
  const [myFavoriteBeaches, setMyFavoriteBeaches] = useState<DocumentData>([]);
  const userState = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchFb = async () => {
      const beachesQuery = collection(db, 'beaches');
      const q = query(
        beachesQuery,
        where('likes', 'array-contains', userState.email)
      );
      const beaches = await getDocs(q);
      setMyFavoriteBeaches(beaches.docs);
    };
    fetchFb();
  }, []);

  return (
    <div className="mx-auto px-4 w-full">
      <h2 className="mt-20 mb-4 font-bold w-full border-b-2 border-slate-200 pb-2">
        내가 좋아하는 해변{' '}
      </h2>
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        {myFavoriteBeaches.map((beach: BeachTypes, index: number) => (
          <FavoriteBeachCard beach={beach} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
