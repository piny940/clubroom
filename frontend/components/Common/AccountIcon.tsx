import Image from 'next/image'
import { useUserInfo } from '../../contexts/UserInfoProvider'

export interface AccountIconProps {
  size: number
  theme: 'dark' | 'light'
  className?: string
  src?: string
}

export const AccountIcon: React.FC<AccountIconProps> = ({
  size,
  theme = 'light',
  className,
  src,
}) => {
  const { user } = useUserInfo()
  const defaultIconPath =
    theme === 'light'
      ? '/images/default_account_icon_black.png'
      : '/images/default_account_icon_white.png'

  return (
    <span
      className={className}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src || user?.global_icon || defaultIconPath}
        className="rounded-circle"
        width={`${size}px`}
        height={`${size}px`}
        alt="account icon"
      />
    </span>
  )
}
