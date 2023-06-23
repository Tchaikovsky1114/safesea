
import { ResponseDataTypes, WeatherDetailsTypes } from '../../types/interface/weather';
import LargeBoldText from '../common/text/LargeBoldText';
import SmallStatusLineText from '../common/text/SmallBoldText';
import Table from './Table';
import Temperatures from './Temperatures';
import WeatherItem from './WeatherItem';

interface WeatherProps {
  minMaxTemp:ResponseDataTypes[]
  geoSearchValue:string
  weather: WeatherDetailsTypes
}

const Weather = ({minMaxTemp,geoSearchValue,weather}:WeatherProps) => {
  
  return (
    <div className='my-24'>
      <LargeBoldText text={`오늘의 ${geoSearchValue} 날씨는?`} />
    <div className="relative">
      <Temperatures minMaxTemp={minMaxTemp} />
      <Table weather={weather} />
    </div>
  </div>
  );
};

export default Weather;