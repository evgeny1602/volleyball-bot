import { cn } from '@/utils/cn'

const STATUS_MAP = {
  out: {
    label: 'Я не участвую',
    classes: 'border-bot-danger text-bot-danger',
  },
  main: {
    label: 'Я в основе',
    classes: 'border-bot-success text-bot-success',
  },
  reserve: {
    label: 'Я в резерве',
    classes: 'border-bot-secondary text-bot-secondary',
  },
}

export const StatusBadge = ({ status = 'out' }) => {
  const { label, classes } = STATUS_MAP[status] || STATUS_MAP.out

  return (
    <span
      className={cn(
        'px-2 text-xs font-medium rounded-full border leading-none py-0.5',
        classes
      )}
    >
      {label}
    </span>
  )
}
