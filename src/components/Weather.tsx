import React from 'react';
import useTime from '../hooks/useTime';
import { ResponseDataTypes, WeatherDetailsTypes } from './KakaoMap';
import WeatherDetails from './WeatherDetails';

interface WeatherProps {
  minMaxTemp:ResponseDataTypes[]
  geoSearchValue:string
  weather: WeatherDetailsTypes
}
const Weather = ({minMaxTemp,geoSearchValue,weather}:WeatherProps) => {
  const {hours} = useTime();
  
  return (
    <div className='mt-24'>
    <h2 className='font-bold text-lg text-center'>오늘의 {geoSearchValue} 날씨는?</h2>  
    <div className="relative">
    <div className='mx-auto flex flex-wrap sm:flex-nowrap flex-row justify-center items-center gap-2 border border-gray-300 shadow-xl rounded-full sm:rounded-3xl px-4 py-8 my-8 bg-slate-300 relative '>
      {minMaxTemp.map((item,i) => (
      <div key={item.baseDate + item.fcstTime + item.category + i + "weather"} className=" border rounded-full bg-white max-w-fit min-w-[80px] p-4 sm:min-w-[100px] sm:min-h-[100px] mx-auto ">
        <p className='w-full text-[10px] sm:text-xs font-bold pt-2 rounded-full break-normal '>{item.fcstDate.substr(4,1) === "0" ? item.fcstDate.substr(5,1) : item.fcstDate.substr(4,2)}월 {item.fcstDate.substr(6,1) === "0" ? item.fcstDate.substr(7,1) : item.fcstDate.substr(6,2)}일</p>
        {item.category === "TMN" &&
        <div className='text-blue-400 font-bold text-xs'>
          <span className='hidden sm:block '>최저 기온</span>
          <p className='text-blue-500 text-xs sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></p>  
          </div>}
        {item.category === "TMX" && <div className='text-red-400 font-bold text-xs'>
          <span className='hidden sm:block'>최고 기온</span>
          <p className='text-red-500 text-xs sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></p>  
          </div>}
        
    </div>
    )
    )}  
    </div>
    <div>


    <div className="h-full scrollbar scrollbar-thumb-rose-900 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-blue-500 transition-colors duration-150">
      <p className="text-rose-400 text-xs font-bold text-left pb-2"> * 빨간색이 현재 시간의 날씨를 나타내고 있어요!</p>


      <div className='flex flex-row justify-start'>  
    <h3 className='w-full font-bold text-[18px] py-2 min-w-[100px]   flex justify-center items-center border bg-rose-400'><p>현재 기온</p></h3>
    {weather.tmp.map((item,index) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category + index} forecastDate={item.fcstDate} forecastCategory={item.category}  forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>

    
      <div className='flex flex-row justify-start'>    
      <h3 className='w-full font-bold text-base min-w-[100px]  flex justify-center items-center border bg-indigo-400 '><p>비소식</p></h3>
    {weather.pcp.map((item,index) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category+ index} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
    
    

    <div className='flex flex-row justify-start'>
    <h3 className='w-full font-bold text-base min-w-[100px]   flex justify-center items-center border bg-slate-400'><p>비 내릴 확률</p></h3>
    {weather.pop.map((item,index) => <WeatherDetails key={item.fcstTime + item.fcstDate + item.category + index}  forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>

    <div className='flex flex-row justify-start'>
    <h3 className='w-full font-bold text-base min-w-[100px]   flex justify-center items-center border bg-blue-400'><p>습도</p></h3>
    {weather.reh.map((item,index) => <WeatherDetails  key={item.fcstTime + item.fcstDate + item.category + index} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>

    

    <div className='flex flex-row justify-start'>  
    <h3 className='w-full font-bold text-base min-w-[100px]  flex justify-center items-center border bg-indigo-400 '><p>하늘 상태</p></h3>
    {weather.sky.map((item,index) => <WeatherDetails  key={item.fcstTime + item.fcstDate + item.category + index} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
    
    

 
    </div>
        <div className="p-2"></div>
    </div>
    </div>
    </div>
  );
};

export default Weather;