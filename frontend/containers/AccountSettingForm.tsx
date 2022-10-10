import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
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
      hoge
    </ModalFormBox>
  )
}
