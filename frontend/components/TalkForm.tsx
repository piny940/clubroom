import { FormEventHandler } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import styles from '../styles/talk-app.module.scss'

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
  return (
    <form id={styles.talk_form} onSubmit={onSubmit}>
      <textarea
        className="form-control"
        placeholder="トークを入力"
        {...register(name, { required: requireMessage })}
      />
      <button className="btn">
        <span className="material-icons text-primary">send</span>
      </button>
    </form>
  )
}
