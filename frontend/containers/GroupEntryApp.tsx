import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { postData } from '../utils/api'
import { AlertState } from '../resources/enums'
import { useMovePage } from '../utils/hooks'

export const GroupEntryApp: React.FC = () => {
  const router = useRouter()
  const movePage = useMovePage()

  useEffect(() => {
    if (!router.isReady) return

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
      onFail: () => {
        throw new Error('無効なURLです。')
      },
    })
  }, [router])

  return (
    <div className="container mt-4">
      グループに参加します。そのままお待ちください。
    </div>
  )
}
