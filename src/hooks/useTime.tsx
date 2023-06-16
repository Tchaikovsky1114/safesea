import React, { useEffect, useState } from 'react';

const useTime:any = () => {
  let date = new Date();
  const [month,setMonth] = useState<string|number>(date.getMonth() + 1);
  const [hours,setHours] = useState<string|number>(date.getHours());
  const [year,setYear] = useState<string|number>(date.getFullYear());
  const [day,setDay] = useState<string|number>(date.getDate())
  // let month:string | number = date.getMonth() + 1;
  
  // let hours: string | number = date.getHours();
  let afterFiveHours: string | number = date.getHours() + 5 > 24 ? date.getHours() - 19 : date.getHours() + 5
  afterFiveHours = afterFiveHours < 10 ? "0" + afterFiveHours : afterFiveHours

  let minutes: string | number = date.getMinutes();
  const forecastNoticeTime = ["02","05","08","11","14","17","20","23"];
  let nowNoticeTime: number | string = 0;
  let today: number | string = year + "" + month + '' + day;
  
  
useEffect(() => {
  if(+month < 10){
    setMonth('0'+ month);
  }
  if(+hours < 10){
    setHours('0'+ hours);
  }
  if(+day < 10){
    setDay('0'+ day);
  }
  today = year+ "" + month + '' + day;
  
  
}, [])
for(let i = 0; i < forecastNoticeTime.length; i++){
  let h = Number(forecastNoticeTime[i]) - Number(hours);
  
  if( h === 0 || h === -1 || h === -2 ){
    nowNoticeTime = Number(forecastNoticeTime[i]);
  }
  if(hours == 0 || hours == 1){
    today = Number(year+ "" + month + '' + day) - 1
    nowNoticeTime = Number(forecastNoticeTime[7]);
  }
}
if(nowNoticeTime < 10){
  nowNoticeTime ='0' + nowNoticeTime
}


  return {
    today,
    nowNoticeTime,
    hours,
    minutes,
    afterFiveHours
  }
};

export default useTime;