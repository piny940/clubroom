import { useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TalkForm } from '../components/TalkApp/TalkForm'
import { Talks } from '../components/TalkApp/Talks'
import { useAlerts } from '../contexts/AlertsProvider'
import { useUserInfo } from '../contexts/UserInfoProvider'
import styles from '../styles/talk-app.module.scss'
import { Talk, Talkroom as TalkroomType } from '../resources/types'
import { fetchTalks, postData } from '../utils/api'
import { AlertState } from '../resources/enums'
import { toClass } from '../utils/helpers'
import { MaterialIcon } from '../components/Common/MaterialIcon'

export interface TalkroomProps {
  openTalkroom: TalkroomType | undefined
  talkroomShown: boolean
  setTalkroomShown: (shown: boolean) => void
}

export const Talkroom: React.FC<TalkroomProps> = ({
  openTalkroom,
  setTalkroomShown,
  talkroomShown,
}) => {
  const [talks, setTalks] = useState<Talk[]>([])
  const { user } = useUserInfo()
  const { setAlerts } = useAlerts()

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
    <section
      className={toClass(
        styles.talk_room,
        'col-md-8 col-lg-9 p-0',
        talkroomShown ? 'd-block' : 'd-md-block d-none'
      )}
    >
      {openTalkroom ? (
        <>
          <a
            role="button"
            className="d-md-none d-flex align-items-center ms-4 my-1"
            onClick={() => setTalkroomShown(false)}
          >
            <MaterialIcon name="chevron_left" className="fs-5" />
            トーク一覧に戻る
          </a>
          <h3 className="d-md-none ms-4">{openTalkroom.name}</h3>
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
