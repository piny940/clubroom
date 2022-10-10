import { RefObject } from 'react'
import { toClass } from '../../utils/helpers'

export interface MaterialIconProps {
  color?: string
  name: string
  className?: string
  refObj?: RefObject<HTMLSpanElement>
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  color,
  name,
  className = '',
  refObj,
}) => {
  return (
    <span
      style={{ color }}
      className={toClass('material-icons', className)}
      ref={refObj}
    >
      {name}
    </span>
  )
}
