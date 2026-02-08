import { Menu } from '@/ui/Menu'

export function MainPage() {
  return (
    <div className="flex flex-col items-center gap-20 mt-5 relative h-dvh w-full">
      Главная
      <Menu className={'fixed bottom-5'} />
    </div>
  )
}
