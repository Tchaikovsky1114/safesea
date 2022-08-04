import React, { useEffect } from 'react';

const useTime = () => {
  
  
  const date = new Date();
  const year = date.getFullYear();
  let month:string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const forecastNoticeTime = ["02","05","08","11","14","17","20","23"];
  let nowNoticeTime: number | string = 0;
  let today = '';
  
  for(let i = 0; i < forecastNoticeTime.length; i++){
    let h = Number(forecastNoticeTime[i]) - hours;
    if(h === 0 || h === -1 || h === -2 ){
      nowNoticeTime = Number(forecastNoticeTime[i]);
    }
    if(hours === Number("00")){
      nowNoticeTime === Number(forecastNoticeTime[7]);
    }
  }
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
  
  if(nowNoticeTime < 10){
    nowNoticeTime ='0' + nowNoticeTime
  }
  
  return {
    today,
    nowNoticeTime,
    hours,
    minutes
  }
};

export default useTime;