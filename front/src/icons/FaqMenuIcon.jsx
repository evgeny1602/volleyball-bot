import icon from '@/assets/icons/faq.png'
import { BaseMenuIcon } from './BaseMenuIcon'

export const FaqMenuIcon = ({ className, onClick, variant = 'default' }) => {
  return (
    <BaseMenuIcon
      className={className}
      onClick={onClick}
      icon={icon}
      text="FAQ"
      variant={variant}
    />
  )
}
