import icon from '@/assets/icons/profile.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const ProfileMenuIcon = ({
  className,
  onClick,
  variant = 'default',
}) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="Профиль"
      variant={variant}
    />
  )
}
