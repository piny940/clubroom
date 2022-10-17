import { FormEventHandler } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface TalkroomMenuFormProps {
  label: string
  register: UseFormRegister<FieldValues>
  name: string
  requiredMessage?: string
  onSubmit: FormEventHandler
  testID: string
  submitButtonText: string
}

export const TalkroomMenuForm: React.FC<TalkroomMenuFormProps> = ({
  label,
  register,
  name,
  requiredMessage,
  onSubmit,
  testID,
  submitButtonText,
}) => {
  return (
    <form onSubmit={onSubmit} data-testid={testID} className="row my-3">
      <label className="row form-group">
        <div className="col-lg-3 fw-bold mb-2 mb-lg-0 col-form-label">
          {label}
        </div>
        <div className="col-8 col-md-9 col-lg-7 px-2 mb-2 mb-lg-0">
          <input
            type="text"
            className="w-100 h-100 form-control"
            {...register(name, {
              required: requiredMessage,
            })}
          />
        </div>
        <div className="col-4 col-md-3 col-lg-2">
          <button className="btn btn-outline-primary btn-small">
            {submitButtonText}
          </button>
        </div>
      </label>
    </form>
  )
}
