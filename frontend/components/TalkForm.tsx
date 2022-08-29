import { FormEventHandler, useRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TestID } from '../resources/TestID'
import styles from '../styles/talk-app.module.scss'
import { useKeys } from 'rooks'

export interface TalkFormProps {
  name: string
  register: UseFormRegister<FieldValues>
  requireMessage: string
  onSubmit: FormEventHandler
}

export const TalkForm: React.FC<TalkFormProps> = ({
  name,
  register,
  requireMessage,
  onSubmit,
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useKeys(['Meta', 'Enter'], () => submitButtonRef.current?.click(), {
    when: submitButtonRef !== null,
  })
  useKeys(['Control', 'Enter'], () => submitButtonRef.current?.click(), {
    when: submitButtonRef !== null,
  })

  return (
    <form
      id={styles.talk_form}
      onSubmit={onSubmit}
      data-testid={TestID.TALK_FORM}
    >
      <textarea
        className="form-control"
        placeholder="トークを入力"
        {...register(name, { required: requireMessage })}
        data-testid={TestID.TALK_FORM_INPUT}
      />
      <button className="btn" ref={submitButtonRef} type="submit">
        <span className="material-icons text-primary">send</span>
      </button>
    </form>
  )
}
