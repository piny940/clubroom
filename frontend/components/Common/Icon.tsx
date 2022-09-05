import { toClass } from '../../utils/helpers'

export interface IconProps {
  color?: string
  name: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ color, name, className = '' }) => {
  return (
    <span style={{ color }} className={toClass('material-icons', className)}>
      {name}
    </span>
  )
}
