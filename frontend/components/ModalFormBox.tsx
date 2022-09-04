import { FormEventHandler, ReactNode, RefObject } from 'react'
import { TestID } from '../resources/TestID'
import styles from '../styles/common.module.scss'
import { toClass } from '../utils/helpers'

export interface ModalFormBoxProps {
  targetID: string
  onSubmit: FormEventHandler
  title: string
  alert: string
  submitTestID: TestID
  submitButtonText: string
  children: ReactNode
  closeButtonRef: RefObject<HTMLButtonElement>
}

export const ModalFormBox: React.FC<ModalFormBoxProps> = ({
  targetID,
  children,
  onSubmit,
  title,
  alert,
  submitTestID,
  submitButtonText,
  closeButtonRef,
}) => {
  return (
    <div className="modal fade" id={targetID}>
      <div className={toClass('modal-dialog modal-lg', styles.modal_dialog)}>
        <div className="modal-content">
          <div className="modal-header">
            <button className="btn btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body p-0">
            <form onSubmit={onSubmit} className="container p-5">
              <h2 className="ms-2 mb-4">{title}</h2>
              {alert ? (
                <div className="text-danger" data-testid={TestID.FORM_ERROR}>
                  {alert}
                </div>
              ) : (
                <></>
              )}
              {children}
              <button
                className="btn btn-primary col-md-6 mt-4 offset-md-3"
                data-testid={submitTestID}
              >
                {submitButtonText}
              </button>
              <button
                className="btn btn-secondary col-md-6 my-2 offset-md-3"
                data-bs-dismiss="modal"
                onClick={(e) => e.preventDefault()}
                ref={closeButtonRef}
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
