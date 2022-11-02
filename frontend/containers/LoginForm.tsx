import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { InputBox } from '../components/Common/InputBox'
import { Message } from '../resources/Messages'
import { AlertState } from '../resources/enums'
import styles from '../styles/accounts.module.scss'
import { useEffect, useState } from 'react'
import { useMovePage } from '../utils/hooks'
import { postData } from '../utils/api'
import { TestID } from '../resources/TestID'
import Link from 'next/link'
import { FormBox } from '../components/Common/FormBox'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { CheckBox } from '../components/Common/CheckBox'
import { useRouter } from 'next/router'

export const LoginForm: React.FC = () => {
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
      <InputBox
        register={register}
        label="メールアドレス"
        type="email"
        name="email"
        required={Message.INPUT_REQUIRED}
        testID={TestID.LOGIN_EMAIL}
      />
      <InputBox
        register={register}
        label="パスワード"
        type="password"
        name="password"
        required={Message.INPUT_REQUIRED}
        testID={TestID.LOGIN_PASSWORD}
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
          <Link href={{ pathname: '/accounts/signup', query: router.query }}>
            <a id={styles.signup_link} data-testid={TestID.SIGNUP_LINK}>
              アカウントをお持ちでない方
            </a>
          </Link>
        </span>
      </div>
    </FormBox>
  )
}
