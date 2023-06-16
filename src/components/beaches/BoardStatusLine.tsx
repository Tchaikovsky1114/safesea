import React, { memo } from 'react'




const BoardStatusLine = () => {
  return (
    <li className="w-full">
            <div className="flex flex-row justify-between items-center py-2 mr-2 border-b border-b-slate-300 w-full">
              <div className="md:flex-[1.2] text-center text-xs font-bold hidden md:block">
                글 번호
              </div>
              <div className="flex-[4] md:flex-[6.5] text-xs font-bold">
                제목{' '}
              </div>
              <div className="flex-[1.3] md:flex-[1.3] text-xs font-bold">
                작성자
              </div>
              <div className="flex-[1.2] md:flex-[1.2] text-xs font-bold">
                작성일
              </div>
              <div className="flex-[0.6] md:flex-[0.6] text-xs font-bold">
                평점
              </div>
            </div>
          </li>
  )
}
export default memo(BoardStatusLine);