import { cn } from '@/utils/cn'
import { Circle, CircleCheck } from 'lucide-react'

export const CheckInput = ({ checked, onChange, label, className }) => {
  return (
    <label
      className={cn('group flex items-center gap-2 cursor-pointer', className)}
      onClick={() => onChange?.(!checked)}
    >
      <div
        className={cn(
          'text-bot-primary group-hover:opacity-70 active:scale-90',
          'group-active:scale-90 transition-all duration-200'
        )}
      >
        {checked ? <CircleCheck /> : <Circle />}
      </div>

      {label}
    </label>
  )
}
