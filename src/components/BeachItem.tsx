import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as FullHeartIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc, DocumentData, getDoc, onSnapshot, orderBy, query, setDoc, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useAppSelector } from '../store/store';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
let min = Math.ceil(1);
let max = Math.floor(20);
const nb = Math.ceil(Math.random() * (max - min))

const BeachItem = () => {
  const {beachId} = useParams()
  const location = useLocation()
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

  useEffect(() => {
    dayjs.extend(relativeTime)
    dayjs.locale('ko')
  } , [])


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


  console.log(location);
  return (
    
      <div className='bg-sky-100 w-full h-screen'>
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
      <h3 className="font-bold text-center text-rose-500 py-4 mt-4">{beachId}해수욕장에서 느낀 생생한 후기를 남겨주세요!</h3>
      <ul className=' border-t-2 border-t-gray-200 px-4'>
      <li className='w-full'>
        <div className='flex flex-row justify-between items-center py-2 mr-2'>
          <div className="flex-[1] text-center text-xs font-bold">글 번호</div>
          <div className="flex-[5] text-xs font-bold">제목 </div>
          <div className="flex-[1] text-xs font-bold">작성자</div>
          <div className="flex-[1] text-xs font-bold">작성일</div>
          <div className="flex-[0.4] text-xs font-bold">평점</div>
        </div>
      </li>
      {beachReview.map((review:any,index:number) =>
      (
      <li key={review.data().pid}>
        <Link className='text-sm font-bold border-b-2 border-gray-200' to={`${review.data().pid}`} state={{data:review.data()}} >
        <div className='flex flex-row justify-between gap-2 items-baseline'>
          <div className="flex-[1.2] text-center">{beachReview.length - index}</div>
          <div className='flex-[6.5]'>{review.data().title}</div>
          <div className="flex-[1.2] text-xs">{review.data().username}</div>
          <div className="flex-[1.3] text-xs">{dayjs.unix(review.data().timestamp?.seconds).fromNow()}</div>
          <div className="flex-[0.6] text-xs">{!review.data().lating.toString().split('.')[1] ? review.data().lating + '.0' : review.data().lanting}</div>
        </div>
          </Link>
          </li>) )}
      </ul>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
      <Outlet />
      </div>
      </div>
      
  );
};

export default BeachItem;