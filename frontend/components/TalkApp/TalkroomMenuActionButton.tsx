import { MouseEventHandler } from 'react'

export interface TalkroomMenuActionButtonProps {
  label: string
  handler: MouseEventHandler
}

export const TalkroomMenuActionButton: React.FC<
  TalkroomMenuActionButtonProps
> = ({ label, handler }) => {
  return (
    <div className="row my-3">
      <button className="col-md-8 offset-md-2 btn btn-danger" onClick={handler}>
        {label}
      </button>
    </div>
  )
}
