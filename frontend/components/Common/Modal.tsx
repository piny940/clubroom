import { ReactNode } from 'react'
import { toClass } from '../../utils/helpers'

export interface ModalProps {
  targetID: string
  children: ReactNode
  title?: string
  scrollable?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  targetID,
  children,
  title,
  scrollable,
}) => {
  return (
    <div className="modal fade" id={targetID}>
      <div
        className={toClass(
          'modal-dialog modal-dialog-centered modal-lg',
          scrollable ? 'modal-dialog-scrollable' : ''
        )}
      >
        <div className="modal-content">
          <div className="modal-header">
            {title ? <h5 className="modal-title">{title}</h5> : <></>}
            <button className="btn btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body p-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
