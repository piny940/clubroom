import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/FormGroup'
import { Message } from '../resources/Messages'
import { AlertState } from '../utils/enums'
import { toClass } from '../utils/helpers'
import styles from '../styles/accounts.module.scss'
import { useState } from 'react'
import { useMovePage } from '../utils/hooks'
import { fetchApi } from '../utils/api'
import { useUserState } from '../contexts/UserStateProvider'
import { TestID } from '../resources/TestID'

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setAlert] = useState<string>('')
  const { setUser } = useUserState()

  const movePage = useMovePage()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetchApi({
        url: '/session',
        method: 'POST',
        data: data,
      })
      const json = await response.json()

      if (response.status >= 400) {
        setAlert(json.message)
      } else {
        setUser(json.data.user)
        void movePage('/', {
          content: json.message,
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
      {alert ? (
        <div className="text-danger" data-testid={TestID.FORM_ERROR}>
          {alert}
        </div>
      ) : (
        <></>
      )}
      <FormGroup
        register={register}
        label="メールアドレス"
        type="email"
        name="email"
        required={Message.INPUT_REQUIRED}
        testID={TestID.LOGIN_EMAIL}
      />
      <FormGroup
        register={register}
        label="パスワード"
        type="password"
        name="password"
        required={Message.INPUT_REQUIRED}
        testID={TestID.LOGIN_PASSWORD}
      />
      <button
        className="btn btn-primary col-md-6 my-3 offset-md-3"
        data-testid={TestID.LOGIN_SUBMIT}
      >
        ログイン
      </button>
    </form>
  )
}
