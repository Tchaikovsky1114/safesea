import useTime from '../../hooks/useTime';
import { WeatherDetailsProps } from '../../types/interface/weather';
import EmphasisSmallText from '../common/EmphasisSmallText';
import SmallImageCard from '../common/card/SmallImageCard';



const WeatherDetails = ({forecastDate,forecastCategory,forecastTime,forecastValue}:WeatherDetailsProps) => {
  const {hours,today, minutes} = useTime()  
  const currentMinutes = minutes < 10 ? '0'+minutes : minutes
  const currentForecast = Number(hours +''+ currentMinutes) - Number(forecastTime);

  if(forecastCategory === "TMP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-start gap-2'>
        {
        forecastTime === "0000" && forecastDate.substr(4,1) === '0'
        ? <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(5,1)}월 {forecastDate.substr(6,1) === '0' ? forecastDate.substr(7) : forecastDate.substr(6) }일</p>
        : <p className="font-bold text-xs bg-blue-200 w-full bg-opacity-60 ">{forecastDate.substr(4,2)}월 {forecastDate.substr(6,1) === '0' ? forecastDate.substr(7) : forecastDate.substr(6) }일</p>
        }
       <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>{forecastTime.substr(0,2)}:00</EmphasisSmallText>
         <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>{forecastValue}°C</EmphasisSmallText>
      </div>
    );
  }

  if(forecastCategory === "PCP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
       {
       forecastValue === "강수없음"
        ? <SmallImageCard alt='맑음' src='/sunshine.png' text='없음' textStyle='text-[12px] font-bold' />
        : <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>
            { Number(forecastValue.split('.')[0]) <= 3 && <SmallImageCard alt='비' src='/rainy.png' text='가랑비' />}
            { Number(forecastValue.split('.')[0]) > 3 && Number(forecastValue.split('.')[0]) < 15 && <SmallImageCard alt='비' src='/rainy.png' text='비' />}
            { Number(forecastValue.split('.')[0]) >= 15 &&<SmallImageCard alt='강한 비' src='/rainy.png' text='강한 비' /> }
          </EmphasisSmallText> }
      </div>
    );
  }
  if(forecastCategory === "POP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
        <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>
          {Number(forecastValue) >= 60 ? <><span className='text-[10px] font-bold'>강수 확률 {forecastValue}%! </span><span className='block text-[10px] pt-2'>우산 챙겨가세요! 🌂</span></>: <span>{forecastValue}%</span>}
        </EmphasisSmallText>
      </div>
    );
  }
 
  if(forecastCategory === "REH"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
        <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>{forecastValue}%</EmphasisSmallText>
      </div>
    );
  }
  if(forecastCategory === "SKY"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
         <EmphasisSmallText currentForecast={currentForecast} forecastDate={forecastDate} today={today}>
            <span className='text-xs font-bold'>{Number(forecastValue) < 4  && "청명한 하늘"}</span>
            <span className='text-xs font-bold'>{Number(forecastValue) >= 4  && "구름 많음"}</span>
          </EmphasisSmallText>
      </div>
    );
  }
  
  return <div />

};

export default WeatherDetails;