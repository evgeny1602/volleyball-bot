import { SpinLoaderIcon } from '@/ui/SpinLoaderIcon'

export const LoaderFullScreen = () => {
  return (
    <div className="absolute top-0 left-0 z-3 w-full h-dvh bg-white/35 backdrop-blur-md  flex justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full">
        <SpinLoaderIcon className="text-bot-grey-500" />
        <div className="text-bot-grey-500">Загрузка...</div>
      </div>
    </div>
  )
}
