import { memo } from "react"

interface Props {
  addStyle?: string;
  children: React.ReactNode
}
function SmallBoldText({children, addStyle = 'bg-blue-200 w-full bg-opacity-60'}:Props) {
  return (
    <p className={`text-xs font-bold ${addStyle}`}>
      {children}
    </p>
  )
}

export default memo(SmallBoldText)