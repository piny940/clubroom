import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FormGroup } from '../components/FormGroup'
import { Message } from '../resources/Messages'
import { TestID } from '../resources/TestID'
import { postData } from '../utils/api'
import { AlertState } from '../utils/enums'
import { toClass } from '../utils/helpers'
import { useMovePage } from '../utils/hooks'
import styles from '../styles/navbar.module.scss'

export const NewGroupForm: React.FC = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const [alert, setAlert] = useState<string>('')

  const movePage = useMovePage()

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    const _onSuccess = (json: any) => {
      void movePage('/', {
        content: 'グループを作成しました。',
        state: AlertState.SUCCESS,
      })
    }

    void postData({
      url: '/member/groups',
      data: data,
      scope: 'group',
      onFail: (json: any) => setAlert(json.message),
      onSuccess: _onSuccess,
    })
  }

  return (
    <div className="modal fade" id="new-group-form">
      <div className={toClass('modal-dialog modal-lg', styles.modal_dialog)}>
        <div className="modal-content">
          <div className="modal-header">Close</div>
          <div className="modal-body p-0">
            <form onSubmit={handleSubmit(_submit)} className="container p-5">
              <h2 className="ms-2 mb-4">新規グループ作成</h2>
              {alert ? (
                <div className="text-danger" data-testid={TestID.FORM_ERROR}>
                  {alert}
                </div>
              ) : (
                <></>
              )}
              <FormGroup
                register={register}
                label="グループ名"
                type="text"
                name="name"
                required={Message.INPUT_REQUIRED}
                testID={TestID.GROUP_FORM_NAME}
              />
              <FormGroup
                register={register}
                label="学校"
                type="text"
                name="school"
                testID={TestID.GROUP_FORM_SCHOOL}
              />
              <button
                className="btn btn-primary col-md-6 mt-4 offset-md-3"
                data-testid="2"
              >
                送信
              </button>
              <button
                className="btn btn-secondary col-md-6 my-2 offset-md-3"
                data-bs-dismiss="modal"
                onClick={(e) => e.preventDefault()}
              >
                キャンセル
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
