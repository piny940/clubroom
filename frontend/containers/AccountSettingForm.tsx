import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputBox } from '../components/Common/InputBox'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { TestID } from '../resources/TestID'

export interface AccountSettingsFormProps {
  targetID: string
}

export const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  targetID,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [alert, setFormAlert] = useState('')
  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  })

  const _submit = () => {}

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
        testID={TestID.ACCOUNT_SETTINGS_EMAIL}
        register={register}
      />
    </ModalFormBox>
  )
}
