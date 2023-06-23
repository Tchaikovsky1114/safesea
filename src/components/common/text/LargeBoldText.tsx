import React, { memo } from 'react'

interface Props {
  text: string;
  addStyle?:string;
}

function LargeBoldText({text,addStyle}:Props) {
  return (
    <p className={`font-bold text-lg text-center ${addStyle}`}>{text}</p>
  )
}

export default memo(LargeBoldText);