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
      <div className='min-w-[140px] h-[100px] flex flex-col items-center justify-center gap-2'>
        {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
       {forecastValue === "강수없음" ? <p className={'text-sm'}>🌞</p> : <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}</p> }
       
      </div>
    );
  }
  if(forecastCategory === "POP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
         {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}%</p>
      </div>
    );
  }
  if(forecastCategory === "PTY"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
      {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}</p>
      </div>
    );
  }
  if(forecastCategory === "REH"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
      {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
      <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}%</p>
      </div>
    );
  }
  if(forecastCategory === "SKY"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
         {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}</p>
      </div>
    );
  }
  if(forecastCategory === "TMP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
         
           {forecastTime === "0000" && forecastDate.substr(4,1) === '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(7)}일</p>}
          {forecastTime === "0000" && forecastDate.substr(4,1) !== '0' && <p className="font-bold text-sm bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(7)}일</p>}
          
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}</p>
      </div>
    );
  }
  return <div>hi</div>

};

export default WeatherDetails;