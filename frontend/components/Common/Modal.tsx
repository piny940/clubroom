import { ReactNode } from 'react'
import styles from '../../styles/common.module.scss'
import { toClass } from '../../utils/helpers'

export interface ModalProps {
  targetID: string
  children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ targetID, children }) => {
  return (
    <div className="modal fade" id={targetID}>
      <div className={toClass('modal-dialog modal-lg', styles.modal_dialog)}>
        <div className="modal-content">
          <div className="modal-header">
            <button className="btn btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body p-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
