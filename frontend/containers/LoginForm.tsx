import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/Common/FormGroup'
import { Message } from '../resources/Messages'
import { AlertState } from '../utils/enums'
import styles from '../styles/accounts.module.scss'
import { useState } from 'react'
import { useMovePage } from '../utils/hooks'
import { postData } from '../utils/api'
import { TestID } from '../resources/TestID'
import Link from 'next/link'
import { FormBox } from '../components/Common/FormBox'
import { useUserInfo } from '../contexts/UserInfoProvider'

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setAlert] = useState<string>('')
  const { updateUser } = useUserInfo()

  const movePage = useMovePage()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    const _onSuccess = (json: any) => {
      void updateUser()
      void movePage('/', {
        content: json.message,
        state: AlertState.SUCCESS,
      })
    }

    void postData({
      url: '/session',
      data: data,
      onFail: (json: any) => setAlert(json.message),
      onSuccess: _onSuccess,
    })
  }

  return (
    <FormBox
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
    </FormBox>
  )
}
