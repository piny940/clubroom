import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { BreakPoint } from '../../resources/types'

export interface SelectBoxProps {
  label: string
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID: string
  labelProportion?: number
  breakPoint?: BreakPoint
  children: ReactNode
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  register,
  name,
  required = '',
  testID,
  breakPoint = 'lg',
  children,
}) => {
  return (
    <label className="row form-group my-3">
      <div className={`col-form-label col-${breakPoint}-3`}>{label}</div>
      <div className={`col-${breakPoint}-9`}>
        <select
          className="form-control"
          data-testid={testID}
          {...register(name, { required })}
        >
          {children}
        </select>
      </div>
    </label>
  )
}
