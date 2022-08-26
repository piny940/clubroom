import type { NextPage } from 'next'
import { AskLogin } from '../components/AskLogin'
import { LoginRequired } from '../containers/LoginRequired'

const Home: NextPage = () => {
  return <LoginRequired whenNoUser={<AskLogin />}>ログイン済み</LoginRequired>
}

export default Home
