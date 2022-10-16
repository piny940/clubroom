import { FieldValues, UseFormRegister } from 'react-hook-form'
import { BreakPoint, InputType } from '../../resources/types'

export interface InputBoxProps {
  label: string
  type: InputType
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID: string
  breakPoint?: BreakPoint
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  type,
  register,
  name,
  required = '',
  testID,
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
      <div className={`col-form-label col-${breakPoint}-3`}>{label}</div>
      <div className={`col-${breakPoint}-9`}>
        {type === 'textarea' ? <textarea {...props} /> : <input {...props} />}
      </div>
    </label>
  )
}
