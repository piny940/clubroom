import { TestID } from '../resources/TestID'
import { toClass } from '../utils/helpers'
import { Talk } from './Talk'

export interface TalkRowProps {
  content: string
  sentFrom: 'myself' | 'others'
}

export const TalkRow: React.FC<TalkRowProps> = ({ content, sentFrom }) => {
  return (
    <li
      className={toClass(
        'w-100 my-2 px-4 d-flex',
        `justify-content-${sentFrom === 'myself' ? 'end' : 'start'}`
      )}
      data-testid={TestID.TALK_ROW}
    >
      <Talk content={content} sentFrom={sentFrom} />
    </li>
  )
}
