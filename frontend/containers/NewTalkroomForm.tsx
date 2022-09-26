import { useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/Common/FormGroup'
import { ModalFormBox } from '../components/Common/ModalFormBox'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { Message } from '../resources/Messages'
import { TestID } from '../resources/TestID'
import { Talkroom } from '../resources/types'
import { postData } from '../utils/api'
import { AlertState } from '../resources/enums'

export interface NewTalkroomFormProps {
  targetID: string
  updateTalkroomList: () => void
  setOpenTalkroom: (talkroom: Talkroom) => void
}

export const NewTalkroomForm: React.FC<NewTalkroomFormProps> = ({
  targetID,
  updateTalkroomList,
  setOpenTalkroom,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setFormAlert] = useState<string>('')
  const { setAlerts } = useAlerts()
  const { group } = useUserInfo()

  const _closeModal = () => {
    closeButtonRef.current?.click()
  }

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    if (!group) {
      throw new Error('グループが選択されていません。')
    }

    const _onSuccess = (json: any) => {
      reset()
      _closeModal()

      setAlerts({
        content: 'トークルームを作成しました。',
        state: AlertState.SUCCESS,
      })

      updateTalkroomList()
      setOpenTalkroom(json.data.talkroom)
    }

    void postData({
      url: `/member/groups/${group.id}/talkrooms`,
      data: data,
      scope: 'talkroom',
      onFail: (json: any) => setFormAlert(json.message),
      onSuccess: _onSuccess,
    })
  }

  return (
    <ModalFormBox
      title="新規トークルーム作成"
      alert={alert}
      submitButtonText="送信"
      submitTestID={TestID.TALKROOM_FORM_SUBMIT}
      targetID={targetID}
      onSubmit={handleSubmit(_submit)}
      closeButtonRef={closeButtonRef}
    >
      <FormGroup
        register={register}
        label="トークルーム名"
        type="text"
        name="name"
        required={Message.INPUT_REQUIRED}
        testID={TestID.TALKROOM_FORM_NAME}
      />
    </ModalFormBox>
  )
}
