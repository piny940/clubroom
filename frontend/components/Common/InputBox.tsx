import { FieldValues, UseFormRegister } from 'react-hook-form'
import { BreakPoint, InputType } from '../../resources/types'
import { upBreakPoint } from '../../utils/helpers'

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
    'data-testid': testID,
    ...register(name, { required }),
  }

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
        {type === 'textarea' ? <textarea {...props} /> : <input {...props} />}
      </div>
    </label>
  )
}
