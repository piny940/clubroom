export interface TalkListInterface {
  width: string
}

export const TalkList: React.FC<TalkListInterface> = ({ width }) => {
  return (
    <div style={{ width: width }} className="border border-dark h-100">
      <ul>
        <li>トーク</li>
        <li>トーク</li>
        <li>トーク</li>
        <li>トーク</li>
      </ul>
    </div>
  )
}
