import { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TalkForm } from '../components/TalkApp/TalkForm'
import { Talks } from '../components/TalkApp/Talks'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useUserState } from '../contexts/UserStateProvider'
import styles from '../styles/talk-app.module.scss'
import { Talk, Talkroom as TalkroomType } from '../types'
import { fetchTalks, postData } from '../utils/api'
import { AlertState } from '../utils/enums'

export interface TalkroomProps {
  width: string
  openTalkroom: TalkroomType | undefined
}

export const Talkroom: React.FC<TalkroomProps> = ({ width, openTalkroom }) => {
  const [talks, setTalks] = useState<Talk[]>([])
  const { user } = useUserState()
  const { setAlerts } = useAlertsState()

  const { register, reset, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const talksRef = useRef<HTMLUListElement>(null)

  const _scrollToBottom = () => {
    talksRef.current?.scrollIntoView(false)
  }

  const _updateTalks = async () => {
    if (!openTalkroom) {
      setTalks([])
      return
    }

    setTalks(await fetchTalks(openTalkroom))
  }

  useEffect(() => {
    _scrollToBottom()
  }, [talks])

  useEffect(() => {
    void _updateTalks()
  }, [openTalkroom])

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    if (!openTalkroom) throw new Error('トークルームを選んでください。')

    void postData({
      url: `/member/groups/${openTalkroom.group_id}/talkrooms/${openTalkroom.id}/talks`,
      data: { content: data.content },
      scope: 'talk',
      onFail: (json: any) =>
        setAlerts({
          content: json.message,
          state: AlertState.DANGER,
        }),
      onSuccess: async (json: any) => {
        await _updateTalks()
        reset()
      },
    })
  }

  return (
    <section style={{ width: width }} className={styles.talk_room}>
      {openTalkroom ? (
        <>
          <Talks talks={talks} userID={user?.id} talksRef={talksRef} />
          <TalkForm
            register={register}
            name="content"
            requireMessage="トークを入力してください。"
            onSubmit={handleSubmit(_submit)}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  )
}
