import { ReactNode } from 'react'

export interface DescriptionProps {
  label: string
  children: ReactNode
}

export const Description: React.FC<DescriptionProps> = ({
  label,
  children,
}) => {
  return (
    <div className="row my-2">
      <div className="col-md-3 fw-bold">{label}</div>
      <div className="col-md-9">{children}</div>
    </div>
  )
}
