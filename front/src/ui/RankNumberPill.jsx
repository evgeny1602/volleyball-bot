import { Medal } from 'lucide-react'
import { cn } from '@/utils/cn'

export const RankNumberPill = ({ rankNumber }) => {
  return (
    <div
      className={cn(
        'text-xs font-mono font-semibold text-white',
        'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500',
        'px-3 py-1',
        'rounded-full'
      )}
    >
      <span className="flex items-center gap-1">
        <Medal size={15} />
        Уровень: {rankNumber}
      </span>
    </div>
  )
}
