import { dateTimeFormatGameCard } from '@/utils/formatters'
import { Star } from 'lucide-react'
import { NoRespects } from '@/ui/NoRespects'

export const ThankUsers = ({ thanks = [] }) => {
  if (!thanks || thanks.length == 0) return <NoRespects />

  return (
    <div className="flex flex-col gap-4">
      {thanks.map(({ name, created_at, from_fio }) => (
        <div
          className="text-sm flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 rounded-3xl p-4 items-center"
          key={name + created_at + from_fio}
        >
          <div className="flex gap-1 items-center">
            <span className="text-gray-500 dark:text-gray-400">
              {dateTimeFormatGameCard(new Date(created_at)).split(' ')[0]}
            </span>

            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {from_fio}
            </span>
          </div>

          <div>
            <span className="flex items-center gap-1 uppercase font-semibold bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-1 rounded-full">
              <Star size={16} />
              {name}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
