import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { postData } from '../utils/api'
import { AlertState } from '../utils/enums'
import { useMovePage } from '../utils/hooks'

export const TalkroomEntryApp: React.FC = () => {
  const router = useRouter()
  const movePage = useMovePage()

  useEffect(() => {
    if (!router.isReady) return

    const talkroomID = router.query.talkroom_id
    const entryToken = router.query.entry_token
    const groupID = router.query.group_id

    if (
      typeof talkroomID !== 'string' ||
      typeof entryToken !== 'string' ||
      typeof groupID !== 'string'
    ) {
      throw new Error('無効なURLです。')
    }

    const onSuccess = (json: any) => {
      void movePage('/', {
        content: json.message,
        state: AlertState.SUCCESS,
      })
    }

    void postData({
      url: `/member/groups/${groupID}/talkrooms/${talkroomID}/talk_entry?entry_token=${entryToken}`,
      data: {},
      onSuccess: onSuccess,
      onFail: () => {
        throw new Error('無効なURLです。')
      },
    })
  }, [router])

  return (
    <div className="container mt-4">
      トークルームに参加します。そのままお待ちください。
    </div>
  )
}
