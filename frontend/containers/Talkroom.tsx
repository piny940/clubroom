import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TalkForm } from '../components/TalkForm'
import { Talks } from '../components/Talks'
import { useAlertsState } from '../contexts/AlertsStateProvider'
import { useUserState } from '../contexts/UserStateProvider'
import styles from '../styles/talk-app.module.scss'
import { Talk, Talkroom as TalkroomType } from '../types'
import { fetchApi, fetchTalks } from '../utils/api'
import { AlertState } from '../utils/enums'

export interface TalkroomInterface {
  width: string
  openTalkroom: TalkroomType | null
}

export const Talkroom: React.FC<TalkroomInterface> = ({
  width,
  openTalkroom,
}) => {
  const [talks, setTalks] = useState<Talk[]>([])
  const { user } = useUserState()
  const { setAlerts } = useAlertsState()

  const { register, reset, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  const _submit: SubmitHandler<FieldValues> = async (data) => {
    if (!openTalkroom) throw new Error('トークルームを選んでください。')

    const response = await fetchApi({
      url: `/member/groups/${openTalkroom.group_id}/talkrooms/${openTalkroom.id}/talks`,
      method: 'POST',
      data: {
        talk: {
          content: data.content,
        },
      },
    })
    const json = await response.json()

    if (response.status >= 400) {
      setAlerts({
        content: json.message,
        state: AlertState.DANGER,
      })
    } else {
      reset()
    }
  }

  const _updateTalks = async () => {
    if (!openTalkroom) {
      setTalks([])
      return
    }

    setTalks(await fetchTalks(openTalkroom))
  }

  useEffect(() => {
    void _updateTalks()
  }, [openTalkroom])

  return (
    <section style={{ width: width }} className={styles.talk_room}>
      {openTalkroom ? (
        <>
          <Talks talks={talks} userID={user?.id} />
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
