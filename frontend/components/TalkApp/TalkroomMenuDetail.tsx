export interface TalkroomMenuDetailProps {
  title: string
  detail: string
}

export const TalkroomMenuDetail: React.FC<TalkroomMenuDetailProps> = ({
  title,
  detail,
}) => {
  return (
    <div className="row my-3">
      <div className="col-md-3 fw-bold">{title}</div>
      <div className="col-md-9">{detail}</div>
    </div>
  )
}
