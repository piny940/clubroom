import { FieldValues, UseFormRegister } from 'react-hook-form'
import { InputType } from '../../resources/types'

export interface InputBoxProps {
  label: string
  type: InputType
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID: string
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  type,
  register,
  name,
  required = '',
  testID,
}) => {
  const props = {
    type: type,
    className: 'form-control',
    'data-testid': { testID },
    ...register(name, { required }),
  }

  return (
    <label className="row form-group my-3">
      <div className="col-lg-3 col-form-label">{label}</div>
      <div className="col-lg-9">
        {type === 'textarea' ? <textarea {...props} /> : <input {...props} />}
      </div>
    </label>
  )
}
