import { FormEventHandler, ReactNode } from 'react'
import { toClass } from '../utils/helpers'
import styles from '../styles/accounts.module.scss'
import { TestID } from '../resources/TestID'

export interface AccountFormBoxProps {
  onSubmit: FormEventHandler
  title: string
  alert: string
  submitTestID: TestID
  submitButtonText: string
  children: ReactNode
}

export const AccountFormBox: React.FC<AccountFormBoxProps> = ({
  onSubmit,
  title,
  alert,
  submitTestID,
  submitButtonText,
  children,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={toClass(
        'container border border-secondary bg-light p-5 mt-5 border-2 rounded',
        styles.form
      )}
    >
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
        className="btn btn-primary col-md-6 my-3 offset-md-3"
        data-testid={submitTestID}
      >
        {submitButtonText}
      </button>
    </form>
  )
}
