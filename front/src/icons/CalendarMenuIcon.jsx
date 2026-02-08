import icon from '@/assets/icons/calendar.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const CalendarMenuIcon = ({
  className,
  onClick,
  variant = 'default',
}) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="Расписание"
      variant={variant}
    />
  )
}
