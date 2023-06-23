import React from 'react'

interface Props {
  imageStyle?:string;
  textStyle?: string;
  src:string;
  alt:string;
  width?:number;
  height?:number;
  text: string;
}

function SmallImageCard({imageStyle = 'mx-auto pb-2',src,alt,width = 24,height = 24,text,textStyle = 'text-[10px] font-bold'}:Props) {
  return (
    <>
    <img className={imageStyle} src={src} alt={alt} width={width} height={height} />
    <span className={textStyle}>{text}</span>
    </>
  )
}

export default SmallImageCard