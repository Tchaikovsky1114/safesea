import React from 'react'

interface Props {
  onClick: () => void;
  text:string;
  textStyle?: string;
}

function TextButton({onClick,text, textStyle}:Props) {
  return (
    <button
    className="py-2 px-4 border border-slate-600 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
    onClick={onClick}
  >
    <span className={`text-xs font-bold ${textStyle}`}>{text}</span>
  </button>
  )
}

export default TextButton