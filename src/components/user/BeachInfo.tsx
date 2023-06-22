import { memo } from 'react'

interface Props {
  text:string;
  info: any
  children?: React.ReactNode;
  addStyle?: string;
}

function BeachInfo({text,info,children,addStyle}: Props) {
  return (
    <li className={`text-xs ${addStyle}`}>
        {children}
        {text}:{' '}
        {info ? info : '정보 없음'}M
      </li>
  )
}

export default memo(BeachInfo);