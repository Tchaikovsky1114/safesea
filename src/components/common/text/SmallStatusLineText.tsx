import { memo } from "react"

interface Props {
  addStyle?: string;
  children: React.ReactNode
}
function SmallStatusLineText({children, addStyle = '"font-bold text-xs bg-blue-200 w-full bg-opacity-60 "'}:Props) {
  return (
    <p className={addStyle}>
      {children}
    </p>
  )
}

export default memo(SmallStatusLineText)