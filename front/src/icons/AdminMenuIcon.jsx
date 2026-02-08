import icon from '@/assets/icons/heart.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const AdminMenuIcon = ({ className, onClick, variant = 'default' }) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="Админ"
      variant={variant}
    />
  )
}
