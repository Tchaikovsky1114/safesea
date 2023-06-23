import { memo } from "react";


interface Props {
  today:any;
  forecastDate:string;
  currentForecast:number;
  children?: React.ReactNode
}

function EmphasisText({today,forecastDate,currentForecast,children}:Props) {
  return (
    <p className={today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-xs font-bold' : 'text-black text-xs' }>
      {children}
    </p>
  )
}

export default memo(EmphasisText);