import icon from '@/assets/icons/volleyball-net.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const GamesMenuIcon = ({ className, onClick, variant = 'default' }) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="Мои игы"
      variant={variant}
    />
  )
}
