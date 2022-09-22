import { ReactNode, useEffect, useRef, useState } from 'react'
import style from '../../styles/common.module.scss'

export interface TooltipProps {
  text: string
  children: ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (!tooltipRef.current) return

    const targetEl = tooltipRef.current.nextElementSibling

    if (!targetEl) return

    targetEl.addEventListener('mouseover', () => {
      setIsShown(true)
    })
    targetEl.addEventListener('mouseleave', () => {
      setIsShown(false)
    })
  })

  return (
    <>
      <div ref={tooltipRef} role="tooltip">
        {isShown ? (
          <>
            <div className={style.tooltip}>{text}</div>
            <span className={style.tooltip_arrow}></span>
          </>
        ) : (
          <></>
        )}
      </div>
      {children}
    </>
  )
}
