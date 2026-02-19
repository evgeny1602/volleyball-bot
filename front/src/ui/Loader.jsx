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
        'flex flex-col items-center justify-center',
        VARIANTS[variant]
      )}
    >
      <SpinLoaderIcon className="text-gray-400" />

      <div className="text-gray-400">Загрузка...</div>
    </div>
  )
}
