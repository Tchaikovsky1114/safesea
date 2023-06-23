import WeatherDetails from './WeatherDetails'
import { ResponseDataTypes } from '../../types/interface/weather'


interface Props {
  weatherType:ResponseDataTypes[]
  textSize?:string;
  bgColor: string;
  text:string;
}

function WeatherItem({weatherType,text,textSize = 'text-base',bgColor}:Props) {
  // console.log(weatherType);
  return (
    <div className='flex flex-row justify-start'>  
      <h3 className={`w-full font-bold py-2 min-w-[100px] flex justify-center items-center border ${bgColor} ${textSize}`}><p>{text}</p></h3>
      {weatherType.map((item,index) => <WeatherDetails key={index} forecastDate={item.fcstDate} forecastCategory={item.category} forecastTime={item.fcstTime} forecastValue={item.fcstValue} />)}
    </div>
  )
}

export default WeatherItem