import { useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { InputBox } from '../components/Common/InputBox'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { Message } from '../resources/Messages'
import { TestID } from '../resources/TestID'
import { postData } from '../utils/api'
import { AlertState } from '../resources/enums'

export interface NewGroupFormProps {
  targetID: string
}

export const NewGroupForm: React.FC<NewGroupFormProps> = ({ targetID }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setFormAlert] = useState<string>('')
  const { setAlerts } = useAlerts()
  const { updateGroups, setGroup } = useUserInfo()

  const _closeModal = () => {
    closeButtonRef.current?.click()
  }

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    const _onSuccess = (json: any) => {
      reset()
      _closeModal()

      setAlerts({
        content: 'グループを作成しました。',
        state: AlertState.SUCCESS,
      })
      void updateGroups()
      setGroup(json.data.group)
    }

    void postData({
      url: '/member/groups',
      data: data,
      scope: 'group',
      onFail: (json: any) => setFormAlert(json.message),
      onSuccess: _onSuccess,
    })
  }

  return (
    <ModalFormBox
      title="新規グループ作成"
      alert={alert}
      submitButtonText="送信"
      submitTestID={TestID.GROUP_FORM_SUBMIT}
      targetID={targetID}
      onSubmit={handleSubmit(_submit)}
      closeButtonRef={closeButtonRef}
    >
      <InputBox
        register={register}
        label="グループ名"
        type="text"
        name="name"
        required={Message.INPUT_REQUIRED}
        testID={TestID.GROUP_FORM_NAME}
      />
      <InputBox
        register={register}
        label="学校"
        type="text"
        name="school"
        testID={TestID.GROUP_FORM_SCHOOL}
      />
    </ModalFormBox>
  )
}
