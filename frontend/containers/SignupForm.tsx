import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { postData } from '../utils/api'
import { AlertState } from '../utils/enums'
import { useMovePage } from '../utils/hooks'
import styles from '../styles/accounts.module.scss'
import { TestID } from '../resources/TestID'
import { FormGroup } from '../components/Common/FormGroup'
import { Message } from '../resources/Messages'
import Link from 'next/link'
import { FormBox } from '../components/Common/FormBox'
import { useUserInfo } from '../contexts/UserInfoProvider'

export const SignupForm: React.FC = () => {
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

    if (data.password !== data['password-confirmation']) {
      setAlert('確認用パスワードがパスワードと一致しません。')
      return
    }

    void postData({
      url: '/user',
      data: data,
      scope: 'user',
      onFail: (json: any) => setAlert(json.message),
      onSuccess: _onSuccess,
    })
  }

  return (
    <FormBox
      onSubmit={handleSubmit(_submit)}
      alert={alert}
      title="新規アカウント作成"
      submitTestID={TestID.SIGNUP_SUBMIT}
      submitButtonText="送信"
    >
      <FormGroup
        label="メールアドレス"
        type="email"
        register={register}
        name="email"
        testID={TestID.SIGNUP_EMAIL}
        required={Message.INPUT_REQUIRED}
      />
      <FormGroup
        label="氏名"
        type="text"
        register={register}
        name="name"
        testID={TestID.SIGNUP_NAME}
        required={Message.INPUT_REQUIRED}
      />
      <FormGroup
        label="パスワード"
        type="password"
        register={register}
        name="password"
        testID={TestID.SIGNUP_PASSWORD}
        required={Message.INPUT_REQUIRED}
      />
      <FormGroup
        label="パスワード(確認用)"
        type="password"
        register={register}
        name="password-confirmation"
        testID={TestID.SIGNUP_PASSWORD_CONFIRMATION}
        required={Message.INPUT_REQUIRED}
      />
      <div className="row">
        <span className="w-auto mx-auto">
          <Link href="/accounts/login">
            <a id={styles.signup_link}>ログイン画面へ戻る</a>
          </Link>
        </span>
      </div>
    </FormBox>
  )
}
