import { MainGamesList } from '@/ui/MainGamesList'
import { MainNewsSlider } from '@/ui/MainNewsSlider'

export const MainTab = () => {
  return (
    <div className="w-full flex flex-col flex-1">
      <MainNewsSlider />
      <MainGamesList />
    </div>
  )
}
