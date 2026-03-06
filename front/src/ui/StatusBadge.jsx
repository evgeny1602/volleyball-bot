import { cn } from '@/utils/cn'
import { useCurrentUser } from '@/hooks/users'
import { safariDateFix } from '@/utils/formatters'

const statusMap = {
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
  played: {
    label: 'Я отыграл',
    classes: 'border-gray-400 text-gray-400',
  },
  ended: {
    label: 'Завершена',
    classes: 'border-gray-400 text-gray-400',
  },
}

const getStatus = (user, game) => {
  let gameEnd = new Date(safariDateFix(game.start_datetime))
  gameEnd.setMinutes(gameEnd.getMinutes() + game.duration)

  const now = new Date()

  const statuses = {
    out: gameEnd > now ? 'out' : 'ended',
    main: gameEnd > now ? 'main' : 'played',
    reserve: gameEnd > now ? 'reserve' : 'ended',
  }

  if (!user || !game?.players) return statuses.out

  const status =
    game.players.find((p) => p.tg_id === user.tg_id)?.status || 'out'

  return statuses[status]
}

export const StatusBadge = ({ game }) => {
  const { user } = useCurrentUser()
  const status = getStatus(user, game)
  const { label, classes } = statusMap[status] || statusMap.out

  return (
    <span
      className={cn(
        'px-1.5 text-xs font-medium rounded-full border leading-none py-0.5 flex flex-row itens-center justify-center',
        classes
      )}
    >
      {label}
    </span>
  )
}
