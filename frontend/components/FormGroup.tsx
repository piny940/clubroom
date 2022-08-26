import { FieldValues, UseFormRegister } from 'react-hook-form'
import { InputType } from '../types'
import styles from '../styles/accounts.module.scss'
import { toClass } from '../utils/helpers'
import { TestID } from '../resources/TestID'

export interface FormGroupProps {
  label: string
  type: InputType
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  type,
  register,
  name,
  required = '',
}) => {
  return (
    <label className="row form-group my-3">
      <div
        className="col-md-3 col-form-label"
        data-testid={TestID.FORM_GROUP_LABEL}
      >
        {label}
      </div>
      <div className="col-md-9">
        <input
          type={type}
          className={toClass('form-control', styles.input)}
          data-testid={TestID.FORM_GROUP_INPUT}
          {...register(name, { required })}
        />
      </div>
    </label>
  )
}
