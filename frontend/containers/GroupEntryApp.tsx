import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { postData } from '../utils/api'
import { AlertState } from '../resources/enums'
import { useMovePage } from '../utils/hooks'
import { useUserInfo } from '../contexts/UserInfoProvider'
import { LoginRequired } from './LoginRequired'
import { AskLogin } from '../components/Common/AskLogin'

export const GroupEntryApp: React.FC = () => {
  const { user } = useUserInfo()
  const router = useRouter()
  const movePage = useMovePage()

  useEffect(() => {
    if (!router.isReady || !user) return

    const groupID = router.query.group_id
    const entryToken = router.query.entry_token

    if (typeof groupID !== 'string' || typeof entryToken !== 'string') {
      throw new Error('無効なURLです。')
    }

    const onSuccess = (json: any) => {
      void movePage('/', {
        content: json.message,
        state: AlertState.SUCCESS,
      })
    }

    void postData({
      url: `/member/groups/${groupID}/joining?entry_token=${entryToken}`,
      data: {},
      onSuccess: onSuccess,
      onFail: (json: any) => {
        throw new Error(json.message)
      },
    })
  }, [router, user])

  return (
    <LoginRequired whenNoUser={<AskLogin next="/group_entry" />}>
      <div className="container mt-4">
        グループに参加します。そのままお待ちください。
      </div>
    </LoginRequired>
  )
}
