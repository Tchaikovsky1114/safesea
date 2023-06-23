
import { ResponseDataTypes, WeatherDetailsTypes } from '../../types/interface/weather'
import SmallBoldText from '../common/text/SmallBoldText'
import WeatherItem from './WeatherItem'

interface Props {
  weather: WeatherDetailsTypes
}

function Table({weather}:Props) {
  return (
    <div className="h-full scrollbar scrollbar-thumb-rose-900 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-blue-500 transition-colors duration-150">
      <SmallBoldText addStyle="text-rose-400 text-left pb-2"> * 빨간색이 현재 시간의 날씨를 나타내고 있어요!</SmallBoldText>
      <WeatherItem bgColor='bg-rose-400' weatherType={weather.tmp} text='현재 기온' textSize='text-[18px]' />
      <WeatherItem weatherType={weather.pcp} bgColor='bg-indigo-400' text='비소식' />
      <WeatherItem weatherType={weather.pop} bgColor='bg-slate-400' text='강우 확률' />
      <WeatherItem weatherType={weather.reh} bgColor='bg-blue-400' text='습도' />
      <WeatherItem weatherType={weather.sky} bgColor='bg-indigo-400' text='구름' />
  </div>
  )
}

export default Table