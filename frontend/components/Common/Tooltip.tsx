import { useRef } from 'react'
import style from '../../styles/common.module.scss'

export interface TooltipProps {
  text: string
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={tooltipRef} className={style.tooltip} role="tooltip">
        {text}
      </div>
      <span className={style.tooltip_arrow}></span>
    </>
  )
}
