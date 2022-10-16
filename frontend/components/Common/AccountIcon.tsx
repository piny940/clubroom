import Image from 'next/image'
import { useUserInfo } from '../../contexts/UserInfoProvider'

export interface AccountIconProps {
  size: number
}

export const AccountIcon: React.FC<AccountIconProps> = ({ size }) => {
  const { user } = useUserInfo()

  return (
    <Image
      src={user?.global_icon || 'resources/images/default_account_icon.png'}
      className="rounded-circle"
      width={`${size}px`}
      height={`${size}px`}
      alt="account icon"
    />
  )
}
