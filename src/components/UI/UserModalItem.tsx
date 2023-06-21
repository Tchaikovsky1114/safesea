import React from 'react'

interface Props {
  children: React.ReactNode
}

function UserModalItem({children}:Props) {
  return (
    <li className='border-b-2 border-slate-300/90 md:border-none hover:text-white hover:bg-orange-500 transition-all duration-150 w-full text-center h-14 flex items-center justify-center'>
      {children}
    </li>
  )
}

export default UserModalItem