import React, { memo } from 'react'

interface Props {
  onClick: () => void;
  addStyle?: string;
  src: string;
  imageStyle?: string;
  text: string;
}

function ImageButton({onClick, addStyle, src, imageStyle='w-6 h-6', text}: Props) {
  return (
      <button
        className={`p-4 px-6 font-bold text-sm flex items-center justify-center gap-4 border ${addStyle}`}
        onClick={onClick}
      >
        <img src={src} className={imageStyle} />
        {text}
      </button>
  )
}

export default memo(ImageButton);