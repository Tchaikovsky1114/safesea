import dayjs from 'dayjs';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


interface CustomLocationState {
  state : {
    data : {
      body: string;
      lating: number
      pid: string
      postImage: string[]
      timestamp: {
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
    <div
    className='absolute w-[550px] h-[600px] -translate-x-1/2 -translate-y-1/2 mx-auto bg-white z-30 top-1/2 rounded-lg p-2 border-2 border-indigo-400 overflow-y-scroll shadow-xl shadow-blue-700-200'>
      <div className='w-full h-fit mx-auto'>
      <div className='flex justify-between items-center py-2 border-b-2 bg-gray-400 px-4 border-y-2 border-y-slate-700 text-gray-100 mt-2'>
        <p>{data.title}</p>
        <p className="text-sm"><span className="font-bold">작성자:</span> <span className="">{data.username}</span></p>
        </div>
        <div className='text-right w-full py-2'><span className="text-xs font-bold">{dayjs.unix(data.timestamp?.seconds).fromNow()} 작성</span></div>
      <div className=''>
      {data.postImage.map((item) => (
        <img className='w-[400px] mx-auto' src={item} alt="" />
      ))}
      </div>
      <p>{data.body}</p>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div> 
  );
};

export default BeachReview;