import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as FullHeartIcon } from '@heroicons/react/solid';
import { collection, deleteDoc, doc, DocumentData, getDoc, onSnapshot, setDoc, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  return (
    
      <div className='bg-sky-100 w-full h-full'>
      <p className='text-center pt-4 font-bold text-2xl'>{beachId} 해수욕장</p>
      <img className="mx-auto w-[800px] h-[360px] object-center my-4 rounded-lg" src={`/beach${nb}.jpg`} alt={`{beachId} 해수욕장 사진`} />
      <div className="flex flex-row items-center">
        {!like && <HeartIcon className='w-8 h-8 mr-1 cursor-pointer' onClick={likesHandler}/>}
        {like && <FullHeartIcon className='w-8 h-8 mr-1 fill-rose-400 cursor-pointer' onClick={likesHandler} />}
        <span className="font-bold">{likes.length} likes</span>
      </div>
      </div>
      
    
  );
};

export default BeachItem;