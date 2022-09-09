import { FormEventHandler, ReactNode, RefObject } from 'react'
import { TestID } from '../../resources/TestID'
import { Modal } from './Modal'

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
    <Modal targetID={targetID} closeButtonRef={closeButtonRef}>
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
        >
          キャンセル
        </button>
      </form>
    </Modal>
  )
}
