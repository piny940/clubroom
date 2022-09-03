import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/FormGroup'
import { Message } from '../resources/Messages'
import { AlertState } from '../utils/enums'
import styles from '../styles/accounts.module.scss'
import { useState } from 'react'
import { useMovePage } from '../utils/hooks'
import { fetchApi } from '../utils/api'
import { useUserState } from '../contexts/UserStateProvider'
import { TestID } from '../resources/TestID'
import Link from 'next/link'
import { AccountFormBox } from '../components/AccountFormBox'

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setAlert] = useState<string>('')
  const { setUser } = useUserState()

  const movePage = useMovePage()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
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
  }

  return (
    <AccountFormBox
      onSubmit={handleSubmit(_submit)}
      title="ログイン"
      alert={alert}
      submitTestID={TestID.LOGIN_SUBMIT}
      submitButtonText="ログイン"
    >
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
      <div className="row">
        <span className="w-auto mx-auto">
          <Link href="/accounts/signup">
            <a id={styles.signup_link} data-testid={TestID.SIGNUP_LINK}>
              アカウントをお持ちでない方
            </a>
          </Link>
        </span>
      </div>
    </AccountFormBox>
  )
}
