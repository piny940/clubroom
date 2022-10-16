export interface DetailDescriptionProps {
  title: string
  content: string
}

export const DetailDescription: React.FC<DetailDescriptionProps> = ({
  title,
  content,
}) => {
  return (
    <div className="row my-3">
      <div className="col-md-3 fw-bold">{title}</div>
      <div className="col-md-9">{content}</div>
    </div>
  )
}
