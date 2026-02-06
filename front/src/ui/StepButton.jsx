import { tgVibro } from '@/utils/telegram'

export const StepButton = ({ children, onClick }) => {
  const handleClick = () => {
    tgVibro('medium')

    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-bot-primary py-2 px-4 rounded-[50%] text-white font-semibold font-mono hover:cursor-pointer active:scale-95 transition-transform"
    >
      {children}
    </button>
  )
}
