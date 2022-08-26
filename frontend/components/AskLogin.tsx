import Link from 'next/link'

export const AskLogin: React.FC = () => {
  return (
    <Link href="/accounts/login">
      <a className="text-danger border-bottom border-danger">
        ログインしてください。
      </a>
    </Link>
  )
}
