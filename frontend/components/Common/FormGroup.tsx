import { FieldValues, UseFormRegister } from 'react-hook-form'
import { InputType } from '../../resources/types'

export interface FormGroupProps {
  label: string
  type: InputType
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID: string
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  type,
  register,
  name,
  required = '',
  testID,
}) => {
  return (
    <label className="row form-group my-3">
      <div className="col-md-3 col-form-label">{label}</div>
      <div className="col-md-9">
        <input
          type={type}
          className="form-control"
          data-testid={testID}
          {...register(name, { required })}
        />
      </div>
    </label>
  )
}
