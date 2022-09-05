import { FormEventHandler, useRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TestID } from '../../resources/TestID'
import styles from '../../styles/talk-app.module.scss'
import { useKey } from '../../utils/hooks'
import { MaterialIcon } from '../Common/MaterialIcon'

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

  useKey(() => submitButtonRef.current?.click(), 'Enter', { meta: true })
  useKey(() => submitButtonRef.current?.click(), 'Enter', { ctrl: true })

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
      <button
        className="btn"
        ref={submitButtonRef}
        type="submit"
        data-testid={TestID.TALK_FORM_SUBMIT}
      >
        <MaterialIcon name="send" className="text-primary" />
      </button>
    </form>
  )
}
