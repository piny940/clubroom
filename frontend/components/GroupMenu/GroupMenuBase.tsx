import { ReactNode } from 'react'

export interface GroupMenuBaseProps {
  children: ReactNode
}

export const GroupMenuBase: React.FC<GroupMenuBaseProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column w-25">
        <ul>
          <li>hoge1</li>
          <li>hoge2</li>
          <li>hoge3</li>
          <li>hoge4</li>
        </ul>
      </div>
      <div className="d-flex w-75">{children}</div>
    </div>
  )
}
