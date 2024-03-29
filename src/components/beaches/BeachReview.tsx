import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import  { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { faComment, faStar, faHeart as faFillHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments, faHeart, faStar as faEmptyStar, faStarHalfStroke} from '@fortawesome/free-regular-svg-icons'
import ReactStars from 'react-rating-stars-component'
import { collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';

import BeachUpdateReview from './BeachUpdateReview';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { fetchCommentLikes, fetchComments } from '../../store/slices/CommentsSlice';

interface CustomLocationState {
  state : {
    data : {
      body: string;
      lating: number
      pid: string
      uid:string
      postImage: string[]
      timestamp: {
        seconds: number,
        nanoseconds: number 
      }
      title:string;
      username: string;
    },
    postTime: string
  }
  
}

const BeachReview = () => {
  const location = useLocation() as CustomLocationState;
  const navigate = useNavigate()
  const {beachId} = useParams()
  const userState = useAppSelector(state => state.user)
  const userId = userState.userData.uid
  const {data,postTime} = location.state;
  const dispatch = useAppDispatch()
  const [editMode,setEditMode] = useState(false)
  const [updateTitleValue,setUpdateTitleValue] = useState(data.title)
  const [updateBodyValue,setupdateBodyValue] = useState(data.body);
  const [updateImage,setUpdateImage] = useState<string[]>(data.postImage);
  const [comment,setComment] = useState('')
  const [comments,setComments] = useState<DocumentData[]>([]);
  
  const deletePostHandler = async () => {
    if(!beachId) return;
    await deleteDoc(doc(db,'beaches',beachId,'posts',data.pid))
    navigate(-1);
  }

  const updateTitleHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const {currentTarget:{value}} = e
    setUpdateTitleValue(value)
  },[])
  
  const updateModeHandler = useCallback(() => {
    setEditMode(true);
  },[])

  const cancelWriteReviewHandler = useCallback(() => {
    navigate(-1)
    setEditMode(false);
  },[])

  const updateReviewHandler = async() => {
    if(!beachId) return
    try {
      const docRef = doc(db,'beaches',beachId,'posts',data.pid)
      await updateDoc(doc(db,'beaches',beachId,'posts',data.pid),{
        body: updateBodyValue,
        title:updateTitleValue,
      })
      const imageArr:string[] = [];
      if(updateImage.length === 0){
        await updateDoc(doc(db,'beaches',beachId,'posts',data.pid), {
          postImage: []
        })
      }
      await updateImage.map((image,index) => {
        if(!image.includes("https://")){
          const imageRef = ref(storage, `beaches/${docRef.id}/image${index}`)
          uploadString(imageRef,image,"data_url").then(async(snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);
            imageArr.push(downloadURL);
            await updateDoc(doc(db,'beaches',beachId,'posts',data.pid), {
              postImage: imageArr
            })
          })
        }
      })  
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
    
  }
  const updateBodyHandler = useCallback((e:ChangeEvent<HTMLTextAreaElement>) => {
    const {currentTarget:{value}} = e;
    setupdateBodyValue(value);
  },[])

  const commentChangeHandler = useCallback((e:ChangeEvent<HTMLTextAreaElement>) => {
    const {currentTarget:{value}} = e;
    setComment(value);
  },[])
  const commentSendHandler = async() => {
    if(!beachId) return;

    if(!userState.userData.email){
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/auth');
      return;
    }
    if(comment.trim().length < 2){
      alert('2글자 이상 입력해주세요');
      return
    }
    const commentToSend = comment
    dispatch(fetchComments({
      commentToSend,
      username: userState.userData.username,
      userImage: userState.userData.userImage,
      beachId,
      pid: data.pid,
      email:userState.userData.email
    }))
    setComment('');
  }

  const commentLikeHandler = (cid:string,type:string) => {
    if(!beachId) return;
    dispatch(fetchCommentLikes({
      beachId,
      pid: data.pid,
      cid: cid,
      email: userState.userData.email,
      type
    }))
  }

  

  
  useEffect(() => {
    if(!beachId) return
    const unsubscribe = onSnapshot(
      query(
        collection(db,'beaches',beachId,'posts',data.pid,'comments'),
        orderBy('timestamp','desc')
      ),
      (snapshot) => {
        
        setComments(snapshot.docs);
      },
      (error) => {
        console.error(error);
      }
    )
    return () => unsubscribe();
  }, [])
  
  
  return (
  
    <div
    className='absolute w-[320px] top-60 xs:w-[550px] xs:h-[600px] -translate-x-1/2 -translate-y-1/2 mx-auto bg-white z-30 xs:top-1/2 rounded-lg border-2 border-indigo-400 overflow-y-auto scroll-m-1 scroll shadow-xl shadow-indgo-200 '>
      <div className='w-full h-fit mx-auto'>
      <div className='m-4 flex justify-between items-center py-2 border-b-2 bg-gray-400 px-4 border-y-2 border-y-slate-700 text-gray-100 mt-2'>
        {!editMode && <p className='text-sm '>{data.title}</p>}
        {editMode && <input className='text-sm text-black w-full bg-indigo-100' onChange={updateTitleHandler} maxLength={20} value={updateTitleValue} />}
        
        {!editMode && <p className="text-sm"><span className="text-xs xs:text-sm xs:font-bold">작성자:{' '}</span>
        <span className="text-xs xs:text-sm">{data.username}</span></p>}
        </div>
        <div className="m-4 flex flex-row justify-between border-b border-slate-400/50">
        <div className='text-right w-full py-2'><span className="text-xs">{postTime} 작성</span></div>
        {data.uid === userId &&
        <div className='flex flex-row items-center justify-end text-xs'>
        <button className='w-10 border py-[2px] mx-1 rounded-lg bg-slate-700 text-white' onClick={deletePostHandler}>삭제</button>
        <button className='w-10 border py-[2px] mx-1 rounded-lg bg-slate-700 text-white' onClick={updateModeHandler}>수정</button>
        </div>}
        </div>


      {!editMode &&
      <>
      <div className='mb-8 p-4'>
      {data.postImage?.map((item) => (
        <img key={item} className='w-[400px] mx-auto' src={item} alt="" />
      ))}
      </div>
      <p className='mb-12 text-sm m-4'>{data.body}</p>
      <div className='flex justify-center flex-col items-center gap-2 border-y py-4 border-slate-200 w-full'>
        <h3 className='text-sm'>{data.username}님께서 평가하신 점수는?</h3>
        <ReactStars
        count={5}
        size={24}
        isHalf={true} 
        emptyIcon={<FontAwesomeIcon icon={faEmptyStar} />}
        halfIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
        filledIcon={<FontAwesomeIcon icon={faStar} />}
        activeColor="#fc6203"
        edit={false}
        value={data.lating}
        />
        <p className='font-bold text-xs'>{data.lating}점입니다!</p>
      </div>
      </>
      }


      {editMode && <>
      <BeachUpdateReview setUpdateImage={setUpdateImage} updateImage={updateImage} />
      <textarea className='bg-indigo-100 w-full h-44' value={updateBodyValue} onChange={updateBodyHandler} />
      </>}
      </div>




              {/* 댓글 UI 개선 필요 - like 기능, timestamp, userImage, username */}
        <div className='pl-2 w-full h-[300px] mt-4 mx-auto p-1'>  
          <p className=' w-full border-b border-slate-700 p-2'><FontAwesomeIcon icon={faComments} /> 댓글</p>
          <ul className='h-[300px] overflow-y-scroll'>
          {comments.map((item,index) => <li key={item.data().cid + index}>
            <div className='flex justify-center items-start flex-col border border-slate-400 my-1 mx-4'>
            <div className='flex items-center justify-between py-1 bg-slate-200 w-full px-2'>
              <div className='flex items-center justify-start py-1 bg-slate-200'>
            <span className="text-xs">{item.data().username}</span>
            <img className='w-4 h-4 rounded-full' src={item.data().userImage} alt={item.data().username} />
            </div>
            <div>
            {!item.data().likes.includes(userState.userData.email) && <FontAwesomeIcon icon={faHeart} onClick={() =>commentLikeHandler(item.data().cid,'ADD')} />}
            {item.data().likes.includes(userState.userData.email) && <FontAwesomeIcon icon={faFillHeart} color="red" onClick={() =>commentLikeHandler(item.data().cid,'REMOVE')} />}

            <span className='text-xs pl-1'>{item.data().likes.length}</span>
            </div>
            </div>
            
            <div className=' flex items-center justify-between h-fit w-full pl-2'>
            <p className='flex-1 h-fit'><span className="text-xs block py-4">{item.data().comment}</span></p>
            <div className='text-xs flex gap-1 mr-1 py-4'>
            <button className='w-8 h-fit bg-slate-400 text-white py-1 rounded-lg'>수정</button>
            <button className='w-8 h-fit bg-slate-400 text-white py-1 rounded-lg'>삭제</button>
            </div>
            </div>

            </div>
            </li>)}
            </ul>
        </div>

        <div className='relative border bg-slate-100 my-16 rounded-md px-2 mx-1'>
        <div className='flex justify-between py-6'>
            <p className='text-xs'><FontAwesomeIcon icon={faComment} /> 댓글 작성</p>
            <p className="text-xs font-bold">{userState.userData.username || '미로그인 상태입니다.'}</p>
          </div>
          <textarea className=' w-full h-20 focus:outline-none text-xs' onChange={commentChangeHandler} value={comment}/>
          <button className='absolute w-12 bottom-0 right-0 text-sm bg-rose-400 text-white p-2 rounded-tl-lg' onClick={commentSendHandler}>전송</button>
        </div>
      <div className='relative flex justify-end items-center'>
      {editMode && <button className='w-[82px] border p-2 rounded-lg bg-rose-400 text-white' onClick={updateReviewHandler} >수정하기</button>}
      <button className='absolute bottom-2 border p-2 rounded-lg bg-indigo-400 text-white' onClick={cancelWriteReviewHandler}>뒤로가기</button>
      
      </div>
    </div> 
  );
};

export default BeachReview;