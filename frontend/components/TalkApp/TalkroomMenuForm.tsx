import { FormEventHandler } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface TalkroomMenuFormProps {
  label: string
  register: UseFormRegister<FieldValues>
  name: string
  requiredMessage?: string
  onSubmit: FormEventHandler
  testID: string
}

export const TalkroomMenuForm: React.FC<TalkroomMenuFormProps> = ({
  label,
  register,
  name,
  requiredMessage,
  onSubmit,
  testID,
}) => {
  return (
    <form onSubmit={onSubmit} data-testid={testID}>
      <label className="row my-3 form-group">
        <div className="col-lg-3 fw-bold mb-2 mb-lg-0 col-form-label">
          {label}
        </div>
        <div className="col-9 col-lg-7 px-2 mb-2 mb-lg-0">
          <input
            type="text"
            className="w-100 h-100 form-control"
            {...register(name, { required: requiredMessage })}
          />
        </div>
        <div className="col-3 col-lg-2">
          <button className="btn btn-outline-primary btn-small">更新</button>
        </div>
      </label>
    </form>
  )
}
