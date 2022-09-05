import { toClass } from '../../utils/helpers'

export interface MaterialIconProps {
  color?: string
  name: string
  className?: string
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  color,
  name,
  className = '',
}) => {
  return (
    <span style={{ color }} className={toClass('material-icons', className)}>
      {name}
    </span>
  )
}
