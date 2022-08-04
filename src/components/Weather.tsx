import React from 'react';
import useTime from '../hooks/useTime';
import { ResponseDataTypes, WeatherDetailsTypes } from './KakaoMap';
import WeatherDetails from './WeatherDetails';

interface WeatherProps {
  minMaxTemp:ResponseDataTypes[]
  geoSearchValue:string
  test: WeatherDetailsTypes
}
const Weather = ({minMaxTemp,geoSearchValue,test}:WeatherProps) => {
  const {hours} = useTime();
  console.log(hours)
  return (
    <div className='mt-24'>
    <h2 className='font-bold text-lg text-center'>오늘의 {geoSearchValue} 날씨는?</h2>  
    <div className="relative grid grid-cols-2 pt-20 gap-12">
    
    <div className='mx-auto rounded-full flex flex-row justify-start justify-center items-center gap-4 bg-yellow-400 opacity-80 w-[480px] h-[480px] relative'>
      {minMaxTemp.map((item,i) => (
      <div key={item.baseDate + item.fcstTime + item.category + i} className=" min-w-[80px]">
        <p>{item.fcstDate.substr(4,1) === "0" ? item.fcstDate.substr(5,1) : item.fcstDate.substr(4,2)}월 {item.fcstDate.substr(7)}일</p>
        {item.category === "TMN" &&
        <div className='text-blue-400 font-bold text-sm'>
          최저 기온
          <p className='text-blue-500'>{item.fcstValue}℃</p>  
          </div>}
        {item.category === "TMX" && <div className='text-red-400 font-bold text-sm'>
          최고 기온
          <p className='text-red-500'>{item.fcstValue}℃</p>  
          </div>}
        
    </div>
    )
    )}  
    </div>
    <div>

    <div className="h-full scrollbar scrollbar-thumb-rose-900 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-blue-500 transition-colors duration-150">
      <p className="text-rose-400 text-xs font-bold text-left pb-2"> * 빨간색이 현재 시간의 날씨를 나타내고 있어요!</p>
      <div className='flex flex-row justify-start'>    
      <h3 className='w-full font-bold text-base min-w-[100px]  flex justify-center items-center border bg-indigo-400 '><p>비소식</p></h3>
    {test.pcp.map((item) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
    
    

    <div className='flex flex-row justify-start'>
    <h3 className='w-full font-bold text-base min-w-[100px]   flex justify-center items-center border bg-slate-400'><p>비 내릴 확률</p></h3>
    {test.pop.map((item) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category}  forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>

    <div className='flex flex-row justify-start'>
    <h3 className='w-full font-bold text-base min-w-[100px]   flex justify-center items-center border bg-blue-400'><p>습도</p></h3>
    {test.reh.map((item) => <WeatherDetails  key={item.fcstTime + item.fcstDate + item.category} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>

    

    <div className='flex flex-row justify-start'>  
    <h3 className='w-full font-bold text-base min-w-[100px]  flex justify-center items-center border bg-indigo-400 '><p>하늘 상태</p></h3>
    {test.sky.map((item) => <WeatherDetails  key={item.fcstTime + item.fcstDate + item.category} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
    
    

    <div className='flex flex-row justify-start'>  
    <h3 className='w-full font-bold text-[18px] py-2 min-w-[100px]   flex justify-center items-center border bg-rose-400'><p>현재 기온</p></h3>
    {test.tmp.map((item) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category} forecastDate={item.fcstDate} forecastCategory={item.category}  forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
    </div>
        <div className="p-2"></div>
    
    </div>
    </div>
    </div>
  );
};

export default Weather;