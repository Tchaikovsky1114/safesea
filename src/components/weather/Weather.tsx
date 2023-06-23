
import { ResponseDataTypes, WeatherDetailsTypes } from '../../types/interface/weather';
import SmallStatusLineText from '../common/text/SmallBoldText';
import WeatherItem from './WeatherItem';

interface WeatherProps {
  minMaxTemp:ResponseDataTypes[]
  geoSearchValue:string
  weather: WeatherDetailsTypes
}

const Weather = ({minMaxTemp,geoSearchValue,weather}:WeatherProps) => {
  
  return (
    <div className='mt-24 mb-20'>
    <h2 className='font-bold text-lg text-center'>오늘의 {geoSearchValue} 날씨는?</h2>  
    <div className="relative">
    <div className='mx-auto flex flex-wrap sm:flex-nowrap flex-row justify-start items-center gap-2 border border-gray-300 shadow-xl rounded-full sm:rounded-3xl px-4 py-8 my-8 bg-slate-300 relative '>
      {minMaxTemp.map((item,i) => (
      <div key={item.baseDate + item.fcstTime + item.category + i + "weather"} className=" border rounded-full bg-white max-w-fit min-w-[80px] p-4 sm:min-w-[100px] sm:min-h-[100px] mx-auto ">
        <p className='w-full text-[10px] sm:text-xs font-bold pt-2 rounded-full break-normal '>{item.fcstDate.substr(4,1) === "0" ? item.fcstDate.substr(5,1) : item.fcstDate.substr(4,2)}월 {item.fcstDate.substr(6,1) === "0" ? item.fcstDate.substr(7,1) : item.fcstDate.substr(6,2)}일</p>
        {
        item.category === "TMN" &&
          <>
            <SmallStatusLineText addStyle='hidden sm:block text-blue-400 mt-1'>최저 기온</SmallStatusLineText>
            <SmallStatusLineText addStyle='text-blue-500 sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></SmallStatusLineText>  
          </>
        }{
        item.category === "TMX" &&
          <>
            <SmallStatusLineText addStyle='hidden sm:block text-red-400 mt-1'>최고 기온</SmallStatusLineText>
            <SmallStatusLineText addStyle='text-red-500 sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></SmallStatusLineText>  
          </>
        }
    </div>
      )
    )}  
    </div>
    <div>
          <div className="h-full scrollbar scrollbar-thumb-rose-900 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-blue-500 transition-colors duration-150">
            <SmallStatusLineText addStyle="text-rose-400 text-left pb-2"> * 빨간색이 현재 시간의 날씨를 나타내고 있어요!</SmallStatusLineText>
            <WeatherItem bgColor='bg-rose-400' weatherType={weather.tmp} text='현재 기온' textSize='text-[18px]' />
            <WeatherItem weatherType={weather.pcp} bgColor='bg-indigo-400' text='비소식' />
            <WeatherItem weatherType={weather.pop} bgColor='bg-slate-400' text='강우 확률' />
            <WeatherItem weatherType={weather.reh} bgColor='bg-blue-400' text='습도' />
            <WeatherItem weatherType={weather.sky} bgColor='bg-indigo-400' text='구름' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;