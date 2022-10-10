import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CollapseBox } from '../components/Common/CollapseBox'
import { InputBox } from '../components/Common/InputBox'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { TestID } from '../resources/TestID'

export interface AccountSettingsFormProps {
  targetID: string
}

export const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  targetID,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [alert, setFormAlert] = useState('')
  const { user, group } = useUserInfo()
  const { register, handleSubmit, reset, setValue } = useForm({
    shouldUseNativeValidation: true,
  })

  const _updateSettings = () => {
    if (!user) return
    setValue('email', user.email)
    setValue('name', user.name)
  }

  const _submit = () => {}

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
      <CollapseBox label="全体設定" className="my-2">
        <InputBox
          label="メールアドレス"
          type="email"
          name="email"
          testID={TestID.ACCOUNT_SETTINGS_EMAIL}
          register={register}
        />
        <InputBox
          label="名前"
          type="text"
          name="name"
          testID={TestID.ACCOUNT_SETTINGS_NAME}
          register={register}
        />
        <InputBox
          label="性別"
          type="text"
          name="gender"
          testID={TestID.ACCOUNT_SETTINGS_GENDER}
          register={register}
        />
        <InputBox
          label="学校"
          type="text"
          name="school"
          testID={TestID.ACCOUNT_SETTINGS_SCHOOL}
          register={register}
        />
        <InputBox
          label="全体公開プロフィール"
          type="textarea"
          name="global_profile"
          testID={TestID.ACCOUNT_SETTINGS_GLOBAL_PROFILE}
          register={register}
        />
        <InputBox
          label="全体公開アイコン"
          type="file"
          name="global_icon"
          testID={TestID.ACCOUNT_SETTINGS_GLOBAL_ICON}
          register={register}
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
