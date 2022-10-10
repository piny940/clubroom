import { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CollapseBox } from '../components/Common/CollapseBox'
import { InputBox } from '../components/Common/InputBox'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { AlertState } from '../resources/enums'
import { TestID } from '../resources/TestID'
import { postData } from '../utils/api'

export interface AccountSettingsFormProps {
  targetID: string
}

export const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  targetID,
}) => {
  const LABEL_PROPORTION = 26
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [alert, setFormAlert] = useState('')
  const { user, group, updateUser } = useUserInfo()
  const { setAlerts } = useAlerts()
  const { register, handleSubmit, reset, setValue } = useForm({
    shouldUseNativeValidation: true,
  })

  const _updateSettings = () => {
    if (!user) return
    setValue('email', user.email)
    setValue('name', user.name)
  }

  const _closeModal = () => {
    closeButtonRef.current?.click()
  }

  const _submit: SubmitHandler<FieldValues> = (data) => {
    const _onSuccess = (json: any) => {
      void updateUser()
      reset()
      _closeModal()
      setAlerts({
        state: AlertState.SUCCESS,
        content: '設定を更新しました。',
      })
    }

    void postData({
      url: 'member/setting',
      scope: 'setting',
      data: data,
      onSuccess: _onSuccess,
      onFail: (json: any) => setFormAlert(json.message),
    })
  }

  useEffect(() => {
    _updateSettings()
  }, [user])

  return (
    <ModalFormBox
      onSubmit={handleSubmit(_submit)}
      targetID={targetID}
      title="アカウント設定"
      submitButtonText="保存"
      closeButtonRef={closeButtonRef}
      alert={alert}
      submitTestID={TestID.ACCOUNT_SETTINGS_SUBMIT}
    >
      <CollapseBox label="全体設定" className="my-2" paddingLeft="2.4rem">
        <InputBox
          label="メールアドレス"
          type="email"
          name="email"
          testID={TestID.ACCOUNT_SETTINGS_EMAIL}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="名前"
          type="text"
          name="name"
          testID={TestID.ACCOUNT_SETTINGS_NAME}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="性別"
          type="text"
          name="gender"
          testID={TestID.ACCOUNT_SETTINGS_GENDER}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="学校"
          type="text"
          name="school"
          testID={TestID.ACCOUNT_SETTINGS_SCHOOL}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="全体公開プロフィール"
          type="textarea"
          name="global_profile"
          testID={TestID.ACCOUNT_SETTINGS_GLOBAL_PROFILE}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="全体公開アイコン"
          type="file"
          name="global_icon"
          testID={TestID.ACCOUNT_SETTINGS_GLOBAL_ICON}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
      </CollapseBox>
      {group ? (
        <CollapseBox label="グループ内設定" className="my-2">
          hoge
        </CollapseBox>
      ) : (
        <></>
      )}
    </ModalFormBox>
  )
}
