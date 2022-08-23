import { useRouter } from 'next/router'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/FormGroup'
import { Message } from '../resources/Messages'
import { PostSessionsResult } from '../utils/apiResults'
import { AlertState } from '../utils/enums'
import { fetchApi } from '../utils/helpers'
import { useAlertsState } from './AlertsStateProvider'

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const { setAlerts } = useAlertsState()

  const router = useRouter()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetchApi({
        url: '/session',
        method: 'POST',
        data: data,
      })
      const json: Promise<PostSessionsResult> = response.json()

      if (response.status >= 400) {
        setAlerts({
          content: (await json).message,
          state: AlertState.DANGER,
        })
      } else {
        await router.push('/')
        setAlerts({
          content: (await json).message,
          state: AlertState.SUCCESS,
        })
      }
    } catch (e) {}
  }

  return (
    <form
      onSubmit={handleSubmit(_submit)}
      className="container border border-secondary bg-light p-5 border-2 rounded"
    >
      <h2 className="ms-2 mb-4">ログイン</h2>
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
