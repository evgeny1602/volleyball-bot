import { useAllThanks } from '@/hooks/thanks'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { cn } from '@/utils/cn'
import { dateTimeFormatGameCard } from '@/utils/formatters'

const ThankCardContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        'w-full rounded-3xl p-4',
        'bg-white dark:bg-gray-700',
        'border border-gray-300 dark:border-gray-700',
        'text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  )
}

const ThankCard = ({ thank, className }) => {
  return (
    <ThankCardContainer className={className}>
      <div className="flex flex-wrap text-xs gap-2">
        <span className="inline-flex items-center text-gray-600 dark:text-gray-400">
          {dateTimeFormatGameCard(new Date(thank.thank_datetime))}
        </span>

        <span className="uppercase inline-flex items-center font-semibold bg-linear-to-br rounded-full py-0.5 px-2 text-white from-indigo-600 via-purple-600 to-pink-500">
          {thank.thank_name}
        </span>

        <span className="inline-flex items-center gap-x-0.5">
          <span className="inline-flex items-center">Игра:</span>
          <span className="font-semibold inline-flex items-center dark:text-gray-300 text-gray-600">
            {dateTimeFormatGameCard(new Date(thank.game_datetime))}
          </span>
        </span>

        <span className="border inline-flex items-center border-gray-400 text-gray-400 px-1 rounded-full lowercase">
          {thank.is_anonymous == 1 ? 'Анононимно' : 'Лично'}
        </span>

        <div>
          <span className="font-semibold inline-flex items-center dark:text-gray-300 text-gray-600">
            {thank.from_user_fio}
          </span>
          <span className="px-1 inline-flex items-center">&rarr;</span>
          <span className="font-semibold inline-flex items-center dark:text-gray-300 text-gray-600">
            {thank.to_user_fio}
          </span>
        </div>
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

  if (isLoading) return <LoaderFullScreen />

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
