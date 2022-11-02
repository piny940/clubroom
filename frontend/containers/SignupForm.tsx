import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { postData } from '../utils/api'
import { AlertState } from '../resources/enums'
import { useMovePage } from '../utils/hooks'
import styles from '../styles/accounts.module.scss'
import { TestID } from '../resources/TestID'
import { InputBox } from '../components/Common/InputBox'
import { Message } from '../resources/Messages'
import Link from 'next/link'
import { FormBox } from '../components/Common/FormBox'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { CheckBox } from '../components/Common/CheckBox'
import { useRouter } from 'next/router'

export const SignupForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const router = useRouter()

  const [alert, setAlert] = useState<string>('')
  const [nextPage, setNextPage] = useState('/')
  const { updateUser } = useUserInfo()

  const movePage = useMovePage()

  useEffect(() => {
    if (router.isReady && typeof router.query.next === 'string') {
      setNextPage(router.query.next)
    }
  }, [router.isReady])

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    const _onSuccess = (json: any) => {
      void updateUser()
      void movePage(nextPage, {
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
      <InputBox
        label="メールアドレス"
        type="email"
        register={register}
        name="user.email"
        testID={TestID.SIGNUP_EMAIL}
        required={Message.INPUT_REQUIRED}
      />
      <InputBox
        label="氏名"
        type="text"
        register={register}
        name="user.name"
        testID={TestID.SIGNUP_NAME}
        required={Message.INPUT_REQUIRED}
      />
      <InputBox
        label="パスワード"
        type="password"
        register={register}
        name="user.password"
        testID={TestID.SIGNUP_PASSWORD}
        required={Message.INPUT_REQUIRED}
      />
      <InputBox
        label="パスワード(確認用)"
        type="password"
        register={register}
        name="user.password-confirmation"
        testID={TestID.SIGNUP_PASSWORD_CONFIRMATION}
        required={Message.INPUT_REQUIRED}
      />
      <CheckBox
        label="次回自動でログインする"
        register={register}
        name="remember_me"
        className="ms-2 mb-2"
        initialValue="checked"
      />
      <div className="row">
        <span className="w-auto mx-auto">
          <Link href={{ pathname: '/accounts/login', query: router.query }}>
            <a id={styles.signup_link}>ログイン画面へ戻る</a>
          </Link>
        </span>
      </div>
    </FormBox>
  )
}
