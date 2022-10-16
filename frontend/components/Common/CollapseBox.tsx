import { ReactNode, useEffect, useRef, useState } from 'react'
import { MaterialIcon } from './MaterialIcon'
import styles from '../../styles/common.module.scss'
import { toClass } from '../../utils/helpers'

export interface CollapseBoxProps {
  label: string
  children: ReactNode
  className?: string
  paddingLeft?: string
  ariaExpanded?: boolean
}

export const CollapseBox: React.FC<CollapseBoxProps> = ({
  label,
  children,
  className,
  paddingLeft = '3rem',
  ariaExpanded = false,
}) => {
  const ARROW_ROTATE_DURATION = 100
  const collapseRef = useRef<HTMLDivElement>(null)
  const togglerArrowRef = useRef<HTMLSpanElement>(null)
  const [collapseID, setCollapseID] = useState('')

  const _onShown = () => {
    togglerArrowRef.current?.animate(
      {
        transform: ['rotate(0deg)', 'rotate(90deg)'],
      },
      {
        duration: ARROW_ROTATE_DURATION,
        fill: 'forwards',
        easing: 'linear',
      }
    )
  }
  const _onHide = () => {
    togglerArrowRef.current?.animate(
      {
        transform: ['rotate(90deg)', 'rotate(0deg)'],
      },
      {
        duration: ARROW_ROTATE_DURATION,
        fill: 'forwards',
      }
    )
  }

  useEffect(() => {
    setCollapseID('collapse-' + Math.random().toString(32).substring(2))
    collapseRef.current?.addEventListener('show.bs.collapse', _onShown)
    collapseRef.current?.addEventListener('hide.bs.collapse', _onHide)

    return () => {
      collapseRef.current?.removeEventListener('show.bs.collapse', _onShown)
      collapseRef.current?.removeEventListener('hide.bs.collapse', _onHide)
    }
  }, [])

  return (
    <div className={className}>
      <div>
        <a
          role="button"
          className={toClass('d-flex', styles.no_color_link)}
          data-bs-toggle="collapse"
          data-bs-target={'#' + collapseID}
        >
          {label}
          <MaterialIcon name="chevron_right" refObj={togglerArrowRef} />
        </a>
      </div>
      <div
        className="collapse"
        style={{ paddingLeft }}
        ref={collapseRef}
        id={collapseID}
        aria-expanded={ariaExpanded}
      >
        {children}
      </div>
    </div>
  )
}
