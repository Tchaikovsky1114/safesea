import React, { memo } from 'react';

const InfowindowSkeleton = () => {
  return (
    <div className='absolute z-20 left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 overflow-hidden isolate shadow-xl shadow-black/5 before:border-t before:border-rose-100/10'>
      <div className='before:absolute before:inset-0 before:-translate-x-full before: animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent'></div>
        <div className= 'z-50 absolute w-full  py-96 bg-gradient-to-r from-transparent via-rose-100/50 to-transparent animate-shimmer -translate-x-full'>{' '}</div>
          <div className="relative w-72 h-[500px] space-y-5 rounded-2xl  p-4 bg-slate-600 opacity-70">
          <div className="mx-auto h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
            <div className="mx-auto w-48 h-48 rounded-full bg-rose-100/10"></div>
              <div className="space-y-5">
                <div className="mx-auto h-3 w-3/5 rounded-lg bg-rose-100/20"></div>
                <div className="h-3 w-full rounded-lg bg-rose-100/20"></div>
                <div className="mx-auto h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
                <div className='flex justify-center items-center '>
                <div className="mx-auto h-3 w-1/5 rounded-lg bg-rose-100/20"></div>
                <div className="mx-auto h-3 w-1/5 rounded-lg bg-rose-100/20"></div>
                <div className="mx-auto h-3 w-1/5 rounded-lg bg-rose-100/20"></div>
                </div>
                <div className="h-3 w-full rounded-lg bg-rose-100/20"></div>
                <div className="h-3 w-full rounded-lg bg-rose-100/20"></div>
                <div className="h-3 w-full rounded-lg bg-rose-100/20"></div>
              </div>
            </div>
          
        </div>
  );
};

export default memo(InfowindowSkeleton);