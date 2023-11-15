import Image from 'next/image'

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
        src={src || defaultIconPath}
        className="rounded-circle"
        width={size}
        height={size}
        alt="account icon"
      />
    </span>
  )
}
