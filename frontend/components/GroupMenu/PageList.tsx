import styles from '../../styles/group-menu.module.scss'
import { PageListButton } from './PageListButton'

export interface PageListProps {
  width: string
}

export const PageList: React.FC<PageListProps> = ({ width }) => {
  return (
    <section style={{ width: width }} className="h-100" id={styles.page_list}>
      <ul className="p-0">
        <PageListButton title="メンバー" open={false} link="members" />
      </ul>
    </section>
  )
}
