import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/FormGroup'
import { Message } from '../resources/Messages'
import { PostSessionsResult } from '../utils/apiResults'
import { AlertState } from '../utils/enums'
import { fetchApi, toClass } from '../utils/helpers'
import styles from '../styles/accounts.module.scss'
import { useState } from 'react'
import { useMovePage } from '../utils/hooks'

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setAlert] = useState<string>('')

  const movePage = useMovePage()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetchApi({
        url: '/session',
        method: 'POST',
        data: data,
      })
      const json: Promise<PostSessionsResult> = response.json()

      if (response.status >= 400) {
        setAlert((await json).message)
      } else {
        void movePage('/', {
          content: (await json).message,
          state: AlertState.SUCCESS,
        })
      }
    } catch (e) {}
  }

  return (
    <form
      onSubmit={handleSubmit(_submit)}
      className={toClass(
        'container border border-secondary bg-light p-5 border-2 rounded',
        styles.form
      )}
    >
      <h2 className="ms-2 mb-4">ログイン</h2>
      {alert ? <div className="text-danger">{alert}</div> : <></>}
      <FormGroup
        register={register}
        label="メールアドレス"
        type="email"
        name="email"
        required={Message.INPUT_REQUIRED}
      />
      <FormGroup
        register={register}
        label="パスワード"
        type="password"
        name="password"
        required={Message.INPUT_REQUIRED}
      />
      <button className="btn btn-primary col-md-6 my-3 offset-md-3">
        ログイン
      </button>
    </form>
  )
}
