import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as FullHeartIcon } from '@heroicons/react/solid';
import { collection, deleteDoc, doc, DocumentData, getDoc, onSnapshot, orderBy, query, setDoc, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useAppSelector } from '../store/store';

let min = Math.ceil(1);
let max = Math.floor(20);
const nb = Math.ceil(Math.random() * (max - min))


const BeachItem = () => {
  const {beachId} = useParams()
  const [beachesInfo,setBeachesInfo] = useState<DocumentData>();
  const [like,setLike] = useState(false);
  const [likes,setLikes] = useState<DocumentData[]>([])
  const [beachReview,setBeachReview] = useState<DocumentData>([])
  const userState = useAppSelector(state => state.user);
  
  useEffect(() => {
    if(!beachId) return

    const fetchData = async() => {
      const docRef = doc(db,'beaches',beachId)
      const docSnap = await getDoc(docRef);
      setBeachesInfo(docSnap.data());
    }
    fetchData()
  }, [])
  console.log(beachesInfo);

  const likesHandler = async() => {
    if(!beachId) return
    setLike(prev => !prev);

    if(like){
      await deleteDoc(doc(db,'beaches',beachId,'likes',userState.userData.username))
    }else{
      await setDoc(doc(db,'beaches',beachId,'likes',userState.userData.username),{
        username: userState.userData.username
      })
    }
  }
  useEffect(() => {
    if(!beachId) return
    const unsubscribe = onSnapshot(collection(db,'beaches',beachId,'likes'),(snapshot) => {
      setLikes(snapshot.docs);
    })
    return () => unsubscribe()
  }, [beachId])

  useEffect(() => {
    if(!beachId) return
      setLike(likes.findIndex((like) => like.id === userState.userData.username) !== -1);
  })

  const fetchBeachReview = async() => {
    if(!beachId) return
     const docRef = doc(db,'beaches',beachId,'posts');
     const docSnap = await getDoc(docRef);
     if(docSnap.exists()){
      setBeachReview(docSnap.data())
     }
  }
  useEffect(() => {
    if(!beachId) return
    const unsubscribe = onSnapshot(
      query(
        collection(db,'beaches',beachId,'posts'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setBeachReview(snapshot.docs)
      }
    )
    return () => unsubscribe()
  }, [])
  console.log(beachReview);
  return (
    
      <div className='bg-sky-100 w-full h-full'>
      <p className='text-center pt-4 font-bold text-2xl'>{beachId} 해수욕장</p>
      <img className="mx-auto w-[800px] h-[360px] object-center my-4 rounded-lg" src={`/beach${nb}.jpg`} alt={`{beachId} 해수욕장 사진`} />

      <div className='flex justify-between items-center'>
      
      <div className="flex flex-row items-center">
        {!like && <HeartIcon className='w-8 h-8 mr-1 cursor-pointer' onClick={likesHandler}/>}
        {like && <FullHeartIcon className='w-8 h-8 mr-1 fill-rose-400 cursor-pointer' onClick={likesHandler} />}
        <span className="font-bold">{likes.length} likes</span>
      </div>

      <Link to={`post`}
      className='border border-transparent w-24 py-1 mb-2 font-bold bg-rose-400 text-white hover:bg-rose-400/80 text-center mr-2 rounded-lg'>글쓰기</Link>
      </div>
      <ul>
      {beachReview.map((review:any) => <li key={review.data().pid}><Link to={`${review.data().pid}`} >{review.data().title}</Link></li> )}
      </ul>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
      <Outlet />
      </div>
      </div>
      
  );
};

export default BeachItem;