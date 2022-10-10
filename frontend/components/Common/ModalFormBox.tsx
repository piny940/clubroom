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
    <Modal targetID={targetID} closeButtonRef={closeButtonRef} scrollable>
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
          className="btn btn-primary col-12 col-lg-6 mt-4 offset-lg-3 d-block"
          data-testid={submitTestID}
        >
          {submitButtonText}
        </button>
        <button
          className="btn btn-secondary col-12 col-lg-6 my-2 offset-lg-3 d-block"
          data-bs-dismiss="modal"
          onClick={(e) => e.preventDefault()}
        >
          キャンセル
        </button>
      </form>
    </Modal>
  )
}
