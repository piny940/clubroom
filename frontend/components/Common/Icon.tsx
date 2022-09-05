export interface IconProps {
  color: string
  name: string
}

export const Icon: React.FC<IconProps> = ({ color, name }) => {
  return (
    <span style={{ color }} className="material-icons">
      {name}
    </span>
  )
}
