import React from 'react';
import { ResponseDataTypes } from './KakaoMap';
import WeatherDetails from './WeatherDetails';

interface WeatherProps {
  minMaxTemp:ResponseDataTypes[]
  geoSearchValue:string
}
const Weather = ({minMaxTemp,geoSearchValue}:WeatherProps) => {
  return (
    <>
    <div className='flex flex-row justify-center items-center gap-4 bg-yellow-300 bg-opacity-20'>
      <h2>오늘의 {geoSearchValue} 날씨는?</h2>
      {minMaxTemp.map((item,i) => (
      <div key={item.baseDate + item.fcstTime + item.category + i} className=" px-4">
        <p>{item.fcstDate.substr(4,1) === "0" ? item.fcstDate.substr(5,1) : item.fcstDate.substr(4,2)}월 {item.fcstDate.substr(7)}일</p>
        <p>{item.category === "TMN" ? "최저 기온" : "최고 기온"}</p>
        <p>{item.fcstValue}℃</p>
    </div>
    )
    )}
    
      
    </div>
    <p><button className='bg-slate-200 w-full h-14 shadow-lg'>상세 날씨보기</button></p>
    <WeatherDetails />
    </>
  );
};

export default Weather;