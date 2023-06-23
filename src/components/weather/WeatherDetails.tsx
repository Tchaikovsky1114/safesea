import useTime from '../../hooks/useTime';
import { WeatherDetailsProps } from '../../types/interface/weather';



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
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm' }>{forecastValue}°C</p>
      </div>
    );
  }

  if(forecastCategory === "PCP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
      
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 font-bold text-xs' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
       {forecastValue === "강수없음"
        ? <p className={'text-xs'}>
        <img src="/sunshine.png" alt="Sunshine" width={24} height={24} />
       </p>
       : <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
        {Number(forecastValue.split('.')[0]) <= 3 &&
        <>
        <img className='mx-auto pb-2' src="/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">가랑비</span>
        </>
        }
        {Number(forecastValue.split('.')[0]) > 3 && Number(forecastValue.split('.')[0]) < 15 &&
        <>
        <img className='mx-auto pb-2' src="/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">비</span>
        </>
        }
        {Number(forecastValue.split('.')[0]) >= 15 &&
        <>
        <img className='mx-auto pb-2' src="/rainy.png" alt="Rainy" width={24} height={24} />
        <span className="text-[10px] font-bold">강한 비</span>
        </>
        }
        </p> }
       
      </div>
    );
  }
  if(forecastCategory === "POP"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
          {Number(forecastValue) >= 60 ? <><span className='text-[10px] font-bold'>강수 확률 {forecastValue}%! </span><span className='block text-[10px] pt-2'>우산 챙겨가세요! 🌂</span></>: <span>{forecastValue}%</span>}
          </p>
      </div>
    );
  }
 
  if(forecastCategory === "REH"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
        <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
        <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastValue}%</p>
      </div>
    );
  }
  if(forecastCategory === "SKY"){
    return (
      <div className='min-w-[140px] min-h-[100px] flex flex-col items-center justify-center gap-2'>
        
       <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>{forecastTime.substr(0,2)}:00</p>
         <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
          <span className='text-xs font-bold'>{Number(forecastValue) < 4  && "구름 없이 맑은 날이에요!"}</span>
          <span className='text-xs font-bold'>{Number(forecastValue) >= 4  && "구름 많은 날입니다!"}</span>
          </p>
      </div>
    );
  }
  
  return <div />

};

export default WeatherDetails;