import React, { memo } from 'react'

interface Props {
  text: string;
}

function LargeBoldText({text}:Props) {
  return (
    <p className='font-bold text-lg text-center'>{text}</p>
  )
}

export default memo(LargeBoldText);