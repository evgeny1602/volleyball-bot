import { SpinLoaderIcon } from '@/ui/SpinLoaderIcon'

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen">
      <SpinLoaderIcon className="text-bot-grey-500" />

      <div className="text-bot-grey-500">Загрузка...</div>
    </div>
  )
}
