import Link from 'next/link'

export const AskLogin: React.FC = () => {
  return (
    <div className="container mt-4">
      <Link href="/accounts/login">
        <a className="text-danger border-bottom border-danger">
          ログインしてください。
        </a>
      </Link>
    </div>
  )
}
