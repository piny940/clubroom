import { FieldValues, UseFormRegister } from 'react-hook-form'
import { breakPoints } from '../../resources/constants'
import { BreakPoint, InputType } from '../../resources/types'

export interface InputBoxProps {
  label: string
  type: InputType
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID: string
  labelProportion?: number
  breakPoint?: BreakPoint
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  type,
  register,
  name,
  required = '',
  testID,
  labelProportion = 25,
  breakPoint = 'lg',
}) => {
  const props = {
    type: type,
    className: 'form-control',
    'data-testid': { testID },
    ...register(name, { required }),
  }

  const labelWidth =
    window.innerWidth > breakPoints[breakPoint]
      ? `${labelProportion}%`
      : undefined

  const inputWidth =
    window.innerWidth > breakPoints[breakPoint]
      ? `${100 - labelProportion}%`
      : undefined

  return (
    <label className="row form-group my-3">
      <div className="col-form-label" style={{ width: labelWidth }}>
        {label}
      </div>
      <div className="" style={{ width: inputWidth }}>
        {type === 'textarea' ? <textarea {...props} /> : <input {...props} />}
      </div>
    </label>
  )
}
