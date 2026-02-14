import { ChevronLeft, ChevronRight } from 'lucide-react'

export const ArrowButton = ({ direction = 'left', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full transition-colors text-white bg-bot-primary active:scale-90"
    >
      {direction === 'left' ? (
        <ChevronLeft size={14} />
      ) : (
        <ChevronRight size={14} />
      )}
    </button>
  )
}
