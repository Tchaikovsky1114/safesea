import React, { useEffect, useRef } from 'react';

const contentText = '떠나고 싶다면,      \n 오늘의 안전한 여행을 위해.        \n The Safe                           '

const Banner = () => {
  const textRef = useRef<any>(null);
  let i = 0;

  let timer:any;
useEffect(() => {
  timer = () =>{
    let txt = contentText[i++]
    textRef.current.innerHTML += txt === "\n" ? "<br/>" : txt;
    if(i > contentText.length){
      textRef.current.textContent = "";
      i = 0
    }
  }
  setInterval(timer,150)
  return () => clearInterval(timer)
  }, [])

  
  return (
    <>
    <div className="w-[90%] mx-auto h-64 text-5xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-4 mt-12 font-bold leading-[80px] rounded-lg">
      <span ref={textRef}></span><span className='text-5xl inline-block align-baseline animate-blink '>|</span>
    </div>
    </>
  );
};

export default Banner;