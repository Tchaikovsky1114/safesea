import React from 'react'
import SmallBoldText from '../common/text/SmallBoldText'
import { ResponseDataTypes } from '../../types/interface/weather'

interface Props {
  minMaxTemp:ResponseDataTypes[]
}

function Temperatures({minMaxTemp}:Props) {
  return (
    <div className='mx-auto flex flex-wrap sm:flex-nowrap flex-row justify-start items-center gap-2 border border-gray-300 shadow-xl rounded-full sm:rounded-3xl px-4 py-8 my-8 bg-slate-300 relative '>
    {minMaxTemp.map((item,index) => (
    <div key={index} className=" border rounded-full bg-white max-w-fit min-w-[80px] p-4 sm:min-w-[100px] sm:min-h-[100px] mx-auto ">
      <p className='w-full text-[10px] sm:text-xs font-bold pt-2 rounded-full break-normal '>
        {item.fcstDate.substr(4,1) === "0" ? item.fcstDate.substr(5,1) : item.fcstDate.substr(4,2)}월 {item.fcstDate.substr(6,1) === "0" ? item.fcstDate.substr(7,1) : item.fcstDate.substr(6,2)}일
      </p>
      {
      item.category === "TMN" &&
        <>
          <SmallBoldText addStyle='hidden sm:block text-blue-400 mt-1'>최저 기온</SmallBoldText>
          <SmallBoldText addStyle='text-blue-500 sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></SmallBoldText>  
        </>
      }{
      item.category === "TMX" &&
        <>
          <SmallBoldText addStyle='hidden sm:block text-red-400 mt-1'>최고 기온</SmallBoldText>
          <SmallBoldText addStyle='text-red-500 sm:text-2xl'>{item.fcstValue}<span className='text-sm'>℃</span></SmallBoldText>  
        </>
      }
  </div>
    )
  )}  
  </div>
  )
}

export default Temperatures