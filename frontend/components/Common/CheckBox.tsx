import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface CheckBoxProps {
  label: string
  register: UseFormRegister<FieldValues>
  name: string
  required?: string
  testID?: string
  className?: string
  initialValue: 'checked' | 'unchecked'
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  register,
  name,
  required,
  testID,
  className,
  initialValue,
}) => {
  return (
    <label className={className}>
      <input
        {...register(name, { required })}
        type="checkbox"
        className="form-check-input me-2"
        data-testid={testID}
        checked={initialValue === 'checked'}
      />
      <span className="form-check-label">{label}</span>
    </label>
  )
}
