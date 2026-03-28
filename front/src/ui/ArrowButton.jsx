import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

export const ArrowButton = ({ direction = 'left', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-1 rounded-full text-white transition-all duration-200',
        'bg-bot-primary active:scale-90 cursor-pointer hover:opacity-80'
      )}
    >
      {direction === 'left' ? (
        <ChevronLeft size={14} />
      ) : (
        <ChevronRight size={14} />
      )}
    </button>
  )
}
