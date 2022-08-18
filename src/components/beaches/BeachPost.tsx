import React, { ChangeEvent, useRef, useState } from 'react';
import { FontAwesomeIcon,FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {faStar as faEmptyStar, faStarHalfStroke} from '@fortawesome/free-regular-svg-icons'
import ReactStars from 'react-rating-stars-component'
import { useNavigate, useParams } from 'react-router-dom';
import { CarouselProvider,Slider,Slide } from 'pure-react-carousel';
import { addDoc, collection, doc, DocumentReference, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { useAppSelector } from '../../store/store';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';



const BeachPost = () => {
  const {beachId} = useParams()
  const [myLating,setMyLating] = useState<number | null>(null)
  const [selectedImage,setSelectedImage] = useState<string[]>([])
  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const navigate = useNavigate()
  const imagePicker = useRef<HTMLInputElement>(null)
  const [isLoading,setIsLoading] = useState(false)
  const userState = useAppSelector(state => state.user)
  // firebase beaches에 collection 생성 (post)
  // user에도 collection 생성 (post) 내가 쓴 post 확인할 수 있게끔..
  // 
  const ratingChangeHandler = (currentRating:any) => {
    setMyLating(currentRating);
    console.log(currentRating);
  }
  const postCancelHandler = () => {
    navigate(-1)
  }
  const imagePickerHandler = () => {
    imagePicker.current!.click();
  }
  const addImageHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files){
      const fileArr = e.currentTarget.files;

      const fileURLs:string[] = [];
      let file:File;

      for(let i = 0; i < fileArr?.length; i++){
        const fileReader = new FileReader();
        file = fileArr[i];
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result as string;
          setSelectedImage(() => [...fileURLs])
        }
        fileReader.readAsDataURL(file)
      }
    }
  }
  const titleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const bodyChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value)
  }
  const deleteSelectedImageHandler = (currentImage:string) => {
    setSelectedImage((prev) => prev.filter((item) => item !== currentImage ))
  }
  const submitPostHandler = async () => {
    if(!beachId || !title || !body || !myLating) return
    setIsLoading(true)
    try {
      const docRef = await addDoc(collection(db,'beaches',beachId,'posts'),{
        username: userState.userData.username,
        title,
        body,
        lating: myLating,
        postImage: null,
        timestamp: serverTimestamp(),
        pid: '',
        uid:userState.userData.uid
      })
      await updateDoc(doc(db,'beaches',beachId,'posts',docRef.id),{
        pid:docRef.id
      })
      const imagesArr:string[] = [];
      await selectedImage.map((image,index) => {
        const imageRef = ref(storage, `beaches/${docRef.id}/image${index}`)
        uploadString(imageRef,image,"data_url").then( async(snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          imagesArr.push(downloadURL);
          await updateDoc(doc(db,'beaches',beachId,'posts',docRef.id),{
            postImage: imagesArr,
          })
        })
      })
    } catch (err) {
      const typedError = err as FirebaseError
      console.error(typedError.message);
    }finally{
      setIsLoading(false);
      navigate(-1);
      setSelectedImage([]);
    }
  }

  return (
    <div className='w-[300px] xs:w-96 xs:h-fit z-20 bg-white border-slate-400 rounded-lg box-border border shadow-md shadow-slate-400 p-1'>
      <label htmlFor="" ><span className='font-bold text-xs pl-1'>제목</span>
      <input
      type="text"
      maxLength={20}
      placeholder="제목은 20자 이내로 작성해주세요"
      className='border bg-slate-200 w-full p-2 rounded-t-lg placeholder:text-slate-700 font-bold text-xs focus:outline-teal-200'
      onChange={titleChangeHandler}/>
      </label>
      <div>
      <div className='py-2 border my-10 rounded-full w-16 h-16 ring-indigo-500 ring-opacity-80 ring-4 mx-auto flex justify-center items-center cursor-pointer' onClick={imagePickerHandler}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vygkKVtVvpRT-anD7uM265RUDMIFJbKexw&usqp=CAU" alt="camera-image" className='w-10 mx-auto' />
      </div>
      <input ref={imagePicker} type="file" hidden multiple onChange={addImageHandler} max={5}/>
      </div>

        {/* carousel */}
        
       {selectedImage.length > 0 &&
       <CarouselProvider className="overflow-hidden relative" naturalSlideWidth={400} naturalSlideHeight={400} totalSlides={selectedImage.length} orientation="horizontal">
        <div className='px-1 text-xs text-rose-400/60'>* 드래그로 사진들을 넘길 수 있어요</div>
        <Slider >
        <div className='flex flex-row h-[230px]'>
          {selectedImage.map((item,index) => (
            <Slide key={index + ''} index={index} className="border w-[200px] h-[250px] flex justify-center items-center relative" tabIndex={index}>
              <img className='absolute object-fill inset-0 w-full h-[210px] mx-auto' src={item} alt="" />
              <button>
                <FontAwesomeIcon icon={faTrashCan} className="absolute z-10 right-2" fill='#f91' color='#f41' onClick={() =>deleteSelectedImageHandler(item)} />
              </button>
              </Slide>
          ))}
        </div>
        </Slider>
        </CarouselProvider>}
        {/* Rating */}
      <div className='mx-auto text-center mt-8'>
        <div className='flex justify-center items-center'>
        <ReactStars
        count={5}
        onChange={ratingChangeHandler}
        size={24}
        isHalf={true} 
        emptyIcon={<FontAwesomeIcon icon={faEmptyStar} />}
        halfIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
        filledIcon={<FontAwesomeIcon icon={faStar} />}
        activeColor="#ffd700" />
        </div>
        {myLating && <div>
          <span className='font-bold text-xs text-rose-400'>{!myLating.toString().split('.')[1] ? myLating + '.0 점' : myLating + '점'}</span>
          <p className='font-bold text-xs text-rose-400'> * 평가한 별점은 이후 수정할 수 없습니다.</p>
          </div>}
      </div>

      <label htmlFor="" className='bottom-0 w-full flex flex-col justify-center items-center'>
        <span className='w-full font-bold text-xs pl-1 text-left'>본문</span>
      <textarea className='w-full bg-slate-200/60 h-44 rounded-lg font-semibold text-sm p-2 focus:outline-teal-200' onChange={bodyChangeHandler} />
      </label>
      <div className="flex justify-end items-center gap-4 mr-5 mt-4 mb-2">
        <button className='w-24 h-10 border rounded-lg bg-sky-600 text-white hover:bg-sky-600/80' onClick={submitPostHandler}>확인</button>
        <button className='w-24 h-10 border rounded-lg bg-rose-400 text-white hover:bg-rose-400/80' onClick={postCancelHandler}>취소</button>
      </div>
    </div>
  );
};

export default BeachPost;