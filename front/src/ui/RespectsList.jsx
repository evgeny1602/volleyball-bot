import { useAllThanks } from '@/hooks/thanks'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { cn } from '@/utils/cn'
import { dateTimeFormatGameCard } from '@/utils/formatters'

const ThankCardContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        'w-full rounded-2xl py-2 px-2',
        'bg-white dark:bg-gray-700',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-500',
        className
      )}
    >
      {children}
    </div>
  )
}

const ThankCard = ({ thank, className }) => {
  console.log(thank)

  return (
    <ThankCardContainer className={className}>
      <div className="flex flex-wrap text-xs gap-x-2 gap-y-1">
        <span>{dateTimeFormatGameCard(new Date(thank.thank_datetime))}</span>

        <span className="uppercase font-semibold text-purple-600 dark:text-purple-400">
          {thank.thank_name}
        </span>

        <span>
          Игра:{' '}
          <span className="font-semibold">
            {dateTimeFormatGameCard(new Date(thank.game_datetime))}
          </span>
        </span>

        <div>
          <span className="font-semibold">{thank.from_user_fio}</span>
          <span className="px-1">&rarr;</span>
          <span className="font-semibold">{thank.to_user_fio}</span>
        </div>

        <span className="bg-gray-400 text-white px-1 rounded-full ml-auto">
          {thank.is_anonymous == 1 ? 'Анононимно' : 'Лично'}
        </span>
      </div>
    </ThankCardContainer>
  )
}

const RespectsListContainer = ({ children, className }) => {
  return (
    <div className={cn('text-sm text-gray-400 dark:text-gray-300', className)}>
      {children}
    </div>
  )
}

export const RespectsList = () => {
  const { data: thanks, isLoading, isError, refetch } = useAllThanks()

  if (isLoading) {
    return <LoaderFullScreen />
  }

  if (thanks.length == 0) {
    return (
      <RespectsListContainer className="flex justify-center">
        Респектов пока нет.
      </RespectsListContainer>
    )
  }

  return (
    <RespectsListContainer className="flex flex-col gap-2">
      {thanks.map((thank) => (
        <ThankCard
          key={thank.id}
          thank={thank}
        />
      ))}
    </RespectsListContainer>
  )
}
