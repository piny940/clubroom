import { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CollapseBox } from '../components/Common/CollapseBox'
import { InputBox } from '../components/Common/InputBox'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { AlertState } from '../resources/enums'
import { TestID } from '../resources/TestID'
import { updateData } from '../utils/api'

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
  const fields = {
    email: 'email',
    name: 'name',
    gender: 'gender',
    school: 'school',
    globalProfile: 'global_profile',
    globalIcon: 'global_icon',
  } as const

  const _updateSettings = () => {
    if (!user) return
    for (const field of Object.values(fields)) {
      setValue(field, user[field])
    }
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

    void updateData({
      url: '/user',
      scope: 'user',
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
          name={fields.email}
          testID={TestID.ACCOUNT_SETTINGS_EMAIL}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="名前"
          type="text"
          name={fields.name}
          testID={TestID.ACCOUNT_SETTINGS_NAME}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="性別"
          type="text"
          name={fields.gender}
          testID={TestID.ACCOUNT_SETTINGS_GENDER}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="学校"
          type="text"
          name={fields.school}
          testID={TestID.ACCOUNT_SETTINGS_SCHOOL}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="全体公開プロフィール"
          type="textarea"
          name={fields.globalProfile}
          testID={TestID.ACCOUNT_SETTINGS_GLOBAL_PROFILE}
          register={register}
          labelProportion={LABEL_PROPORTION}
        />
        <InputBox
          label="全体公開アイコン"
          type="file"
          name={fields.globalIcon}
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
