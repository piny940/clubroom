export interface TalkroomInterface {
  width: string
}

export const Talkroom: React.FC<TalkroomInterface> = ({ width }) => {
  return (
    <div style={{ width: width }} className="border border-dark">
      トークルーム
    </div>
  )
}
