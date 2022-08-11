import React, { useEffect, useRef, useState } from 'react';

const contentText = '떠나고 싶다면?      \n 오늘의 안전한 여행         \n The Safe '

const Banner = () => {
  const textRef = useRef<any>(null);
  let i = 0;
  let timer:any;
  const [blinkOut,setBlinkOut] = useState(false)


  
useEffect(() => {
  
  timer = () =>{
    let txt = contentText[i]
    textRef.current.innerHTML += txt === "\n" ? "<br/>" : txt;
    i++ 
    if(i < contentText.length){
      setTimeout(timer,150)    
    }else{
      setBlinkOut(true)
    }
  }

  setTimeout(timer,150)
  return () => clearInterval(timer)
  }, [])

  
  return (
    <>
    <div className="w-[90%] mx-auto h-64 max-h-64 text-5xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-4 mt-12 font-bold leading-[80px] rounded-lg">
      <span ref={textRef}></span>{!blinkOut && <span className='text-5xl inline-block align-baseline animate-blink '>|</span>}
    </div>
    </>
  );
};

export default Banner;