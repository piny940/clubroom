import { MouseEventHandler } from 'react'
import { TestID } from '../../resources/TestID'

export interface TalkroomMenuActionButtonProps {
  label: string
  handler: MouseEventHandler
}

export const TalkroomMenuActionButton: React.FC<
  TalkroomMenuActionButtonProps
> = ({ label, handler }) => {
  return (
    <button
      className="col-12 col-md-8 offset-md-2 btn btn-danger"
      onClick={handler}
      data-testid={TestID.TALKROOM_MENU_ACTION_BUTTON}
    >
      {label}
    </button>
  )
}
