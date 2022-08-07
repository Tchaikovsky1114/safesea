import React, { useEffect } from 'react';

const useTime:any = () => {
  
  
  const date = new Date();
  const year = date.getFullYear();
  let month:string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  let hours: string | number = date.getHours();
  let afterFiveHours: string | number = date.getHours() + 5 > 24 ? date.getHours() - 19 : date.getHours() + 5
  afterFiveHours = afterFiveHours < 10 ? "0" + afterFiveHours : afterFiveHours

  let minutes: string | number = date.getMinutes();
  const forecastNoticeTime = ["02","05","08","11","14","17","20","23"];
  let nowNoticeTime: number | string = 0;
  let today: number | string = year + "" + month + '' + day;
  
  
//  성능이슈 . 리팩토링 반드시 진행

  if(hours < 10){
    hours = '0'+ hours;
  }
  if(month < 10){
    month = '0'+ month;
  }
  if(day < 10){
    day = '0'+ day;
  }
  today = year+ "" + month + '' + day;
  console.log(hours)
  for(let i = 0; i < forecastNoticeTime.length; i++){
    let h = Number(forecastNoticeTime[i]) - Number(hours);
    console.log('h:',h)
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
  console.log(nowNoticeTime)
  return {
    today,
    nowNoticeTime,
    hours,
    minutes,
    afterFiveHours
  }
};

export default useTime;