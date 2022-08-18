import { faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../firebase';
import { useAppSelector } from '../../store/store';
import ReactStars from 'react-rating-stars-component'
import {faStar as faEmptyStar, faStarHalfStroke} from '@fortawesome/free-regular-svg-icons'

interface BeachUpdateReviewProps {
  updateImage:string[]
  setUpdateImage: React.Dispatch<React.SetStateAction<string[]>>
}

const BeachUpdateReview = ({updateImage,setUpdateImage}:BeachUpdateReviewProps) => {
  const imagePickerRef = useRef<HTMLInputElement>(null)
  


  const addImageHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files) {
      const fileArr = e.currentTarget.files;

      const fileURLs:string[] = [];
      let file: File;

      for(let i = 0; i < fileArr?.length; i++) {
        const fileReader = new FileReader();
        file = fileArr[i];
        fileReader.onload = () => {
          fileURLs[i] = fileReader.result as string;
          setUpdateImage(() => [...fileURLs])
        }
        fileReader.readAsDataURL(file);
      }
    }
  }
  const deleteUpdateImageHandler = (currentImage:number) => {
    const selectImage = updateImage.slice()
    selectImage.splice(currentImage, 1)
    console.log(selectImage)
    setUpdateImage(selectImage)
  }
  const imagePickerHandler = () => {
    imagePickerRef.current!.click();
  }
 
  return (
    <div>
          <div>
      <div className='py-2 border my-10 rounded-full w-16 h-16 ring-indigo-500 ring-opacity-80 ring-4 mx-auto flex justify-center items-center cursor-pointer' onClick={imagePickerHandler}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vygkKVtVvpRT-anD7uM265RUDMIFJbKexw&usqp=CAU" alt="camera-image" className='w-10 mx-auto' />
      </div>
      <input ref={imagePickerRef} type="file" hidden multiple onChange={addImageHandler} max={5}/>
      </div>

        {/* carousel */}
       {updateImage && updateImage.length > 0 && <CarouselProvider className="overflow-hidden relative" naturalSlideWidth={400} naturalSlideHeight={400} totalSlides={updateImage.length} orientation="horizontal">
        <div className='px-1 text-xs text-rose-400/60'>* 드래그로 사진들을 넘길 수 있어요</div>
        <Slider >
        <div className='flex flex-row h-[230px]'>
          {updateImage.map((item,index) => (
            <Slide key={index + ''} index={index} className="border w-[200px] h-[250px] flex justify-center items-center relative" tabIndex={index}>
              <img className='absolute object-fill inset-0 w-full h-[210px] mx-auto' src={item} alt="" />
              <button>
                <FontAwesomeIcon icon={faTrashCan} className="absolute z-10 right-2" fill='#f91' color='#f41' onClick={() =>deleteUpdateImageHandler(index)} />
              </button>
              </Slide>
          ))}
        </div>
        </Slider>
        </CarouselProvider>}
          <p className='text-xs text-rose-400 font-bold'>* 별점은 수정 할 수 없습니다.</p>
          </div>
  );
};


export default BeachUpdateReview;