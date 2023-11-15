import Link from 'next/link'
import { useRouter } from 'next/router'

export interface AskLoginProps {
  next?: string
}

export const AskLogin: React.FC<AskLoginProps> = ({ next }) => {
  const router = useRouter()
  const query = next ? { next, ...router.query } : router.query

  return (
    <div className="container mt-4">
      {router.isReady ? (
        <Link
          href={{
            pathname: '/accounts/login',
            query,
          }}
          className="text-danger border-bottom border-danger"
        >
          ログインしてください。
        </Link>
      ) : (
        <></>
      )}
    </div>
  )
}
