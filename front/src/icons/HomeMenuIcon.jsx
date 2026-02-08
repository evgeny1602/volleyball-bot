import icon from '@/assets/icons/home.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const HomeMenuIcon = ({ className, onClick, variant = 'default' }) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="Главная"
      variant={variant}
    />
  )
}
