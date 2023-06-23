import React, { memo } from 'react'

interface Props {
  children: React.ReactNode;
  wrapperStyle?: string;
}

function CategoryWrapper({children,wrapperStyle = 'justify-center'}:Props) {
  return (
    <div className={`min-w-[140px] min-h-[100px] flex flex-col items-center gap-2 ${wrapperStyle}`}>{children}</div>
  )
}

export default memo(CategoryWrapper);