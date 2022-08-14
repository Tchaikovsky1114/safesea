import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


interface CustomLocationState {
  state : {
    data : {
      body: string;
      lating: number
      pid: string
      postImage: string[]
      timeStamp: {
        seconds: number,
        nanoseconds: number 
      }
      title:string;
      username: string;
    }
  }
  
}

const BeachReview = () => {
  const location = useLocation() as CustomLocationState;
  const navigate = useNavigate()
  const {data} = location.state;
  console.log(data)

  return (
    <div className='absolute inset-0 w-[360px] h-[360px] mx-auto bg-white z-30'>
      <p>{data.title} {data.username}</p>
      <p>{data.body}</p>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default BeachReview;