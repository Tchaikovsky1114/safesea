import { useEffect, useRef, useState } from 'react';

const contentText = '바다가 보고싶을 때,      \n 오늘의 안전한 해변         \n The Safety Sea '

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
    <div className='container mx-auto'>
    <div className=" h-44 md:h-64 max-h-64 text-2xl md:text-5xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-4 mt-12 font-bold leading-[40px] md:leading-[80px] md:rounded-lg">
      <span ref={textRef}></span>{!blinkOut && <span className='text-2xl md:text-5xl inline-block align-baseline animate-blink '>|</span>}
    </div>
    </div>
    </>
  );
};

export default Banner;