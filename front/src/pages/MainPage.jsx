import { Menu } from '@/ui/Menu'

export function MainPage() {
  return (
    <div className="flex flex-col items-center gap-20 mt-5 relative h-screen w-full">
      Главная
      <Menu className={'absolute bottom-5'} />
    </div>
  )
}
