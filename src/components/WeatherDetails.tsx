import React from 'react';
import useTime from '../hooks/useTime';
import { WeatherDetailsTypes } from './KakaoMap';

interface WeatherDetailsProps {
  forecastDate:string
  forecastCategory:string
  forecastTime:string
  forecastValue:string;
}

const WeatherDetails = ({forecastDate,forecastCategory,forecastTime,forecastValue}:WeatherDetailsProps) => {
  const {hours,today, minutes} = useTime()
  
  const currentMinutes = minutes < 10 ? '0'+minutes : minutes
  const currentForecast = Number(hours +''+ currentMinutes) - Number(forecastTime);

  if(forecastCategory === "PCP"){
    return (
      <div className='min-w-[140px] h-[100px] flex flex-col items-center justify-start gap-1'>
        {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 font-bold text-xs' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
       {forecastValue === "강수없음"
       ? <p className={'text-xs'}>
        <img src="/public/sunshine.png" alt="Sunshine" width={24} height={24} />
        <span className="text-[10px] font-bold">맑음!</span>
       </p>
       : <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
        {Number(forecastValue.split('.')[0]) <= 3 &&
        <>
        <img className='mx-auto pb-2' src="/public/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">적은량의 비 소식이 있어요</span>
        </>
        }
        {Number(forecastValue.split('.')[0]) > 3 && Number(forecastValue.split('.')[0]) < 15 &&
        <>
        <img className='mx-auto pb-2' src="/public/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">비가 내려요</span>
        </>
        }
        {Number(forecastValue.split('.')[0]) >= 15 &&
        <>
        <img className='mx-auto pb-2' src="/public/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">강한 비가 예상됩니다!</span>
        </>
        }
        </p> }
       
      </div>
    );
  }
  if(forecastCategory === "POP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-start gap-2'>
         {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
          {Number(forecastValue) >= 60 ? <><span className='text-[10px] font-bold'>강수 확률 {forecastValue}%! </span><span className='block text-[10px] pt-2'>우산 챙겨가세요! 🌂</span></>: <span>{forecastValue}%</span>}
          </p>
      </div>
    );
  }
 
  if(forecastCategory === "REH"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-start gap-2'>
      {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
      <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastValue}%</p>
      </div>
    );
  }
  if(forecastCategory === "SKY"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-start gap-2'>
         {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastValue}</p>
      </div>
    );
  }
  if(forecastCategory === "TMP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-start gap-2'>
         
           {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
          
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastValue}</p>
      </div>
    );
  }
  return <div>hi</div>

};

export default WeatherDetails;