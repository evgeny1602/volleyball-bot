import { cn } from '@/utils/cn'
import { SpinLoaderIcon } from '@/ui/SpinLoaderIcon'

const VARIANTS = {
  large: 'h-screen',
  small: 'h-auto py-12',
}

export const Loader = ({ variant = 'large' }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        VARIANTS[variant]
      )}
    >
      <SpinLoaderIcon className="text-bot-grey-500" />

      <div className="text-bot-grey-500">Загрузка...</div>
    </div>
  )
}
