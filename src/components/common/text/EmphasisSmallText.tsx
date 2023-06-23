import { memo } from "react";


interface Props {
  today:any;
  forecastDate:string;
  currentForecast:number;
  children?: React.ReactNode
  addStyle?: string;
}

function EmphasisText({today,forecastDate,currentForecast,children,addStyle}:Props) {
  return (
    <p className={`${addStyle} ${today === forecastDate && currentForecast < 100 && currentForecast >= -100 ? 'text-rose-400 text-sm font-bold' : 'text-black text-sm'}`}>
      {children}
    </p>
  )
}

export default memo(EmphasisText);