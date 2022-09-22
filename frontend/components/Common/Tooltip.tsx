import { ReactNode, useEffect, useRef, useState } from 'react'
import style from '../../styles/common.module.scss'

export interface TooltipProps {
  testID?: string
  text: string
  children: ReactNode
  onShown?: () => void
  onHidden?: () => void
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  testID,
  onShown = () => undefined,
  onHidden = () => undefined,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (!tooltipRef.current) return

    if (!children || Array.isArray(children.valueOf())) {
      throw new Error("Tooltip's children must be one element.")
    }

    const targetEl = tooltipRef.current.nextElementSibling

    if (!targetEl) return

    targetEl.addEventListener('mouseenter', () => {
      setIsShown(true)
      onShown()
    })
    targetEl.addEventListener('mouseleave', () => {
      setIsShown(false)
      onHidden()
    })
  }, [])

  return (
    <>
      <div ref={tooltipRef} role="tooltip" data-testid={testID}>
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
