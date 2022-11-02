import { MouseEventHandler } from 'react'

export interface ModalMenuActionButtonProps {
  label: string
  handler: MouseEventHandler
  testId?: string
}

export const ModalMenuActionButton: React.FC<ModalMenuActionButtonProps> = ({
  label,
  handler,
  testId,
}) => {
  return (
    <button
      className="col-12 col-md-8 offset-md-2 btn btn-danger"
      onClick={handler}
      data-testid={testId}
    >
      {label}
    </button>
  )
}
