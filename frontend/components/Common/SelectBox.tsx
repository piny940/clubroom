import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { BreakPoint } from '../../resources/types'
import { upBreakPoint } from '../../utils/helpers'

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
  labelProportion = 25,
  breakPoint = 'lg',
  children,
}) => {
  return (
    <label className="row form-group my-3">
      <div
        className="col-form-label"
        style={{ width: upBreakPoint(breakPoint, `${labelProportion}%`) }}
      >
        {label}
      </div>
      <div
        style={{ width: upBreakPoint(breakPoint, `${100 - labelProportion}%`) }}
      >
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
