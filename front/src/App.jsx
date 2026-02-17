import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { RejectedPage } from '@/pages/RejectedPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useCurrentUser } from '@/hooks/users'
import { useEffect } from 'react'

export const App = () => {
  const { user, isLoading } = useCurrentUser()

  useEffect(() => {
    const overflow = 100
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = '0'
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.bottom = '0'

    const handleTouchMove = (e) => {
      // Разрешаем скролл только внутри определенных контейнеров,
      // если у вас есть списки. Если всё приложение статично — просто:
      if (e.target.closest('.scrollable-content')) {
        return
      }
      e.preventDefault()
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800 scrollable-content overflow-y-auto">
      {isLoading && <Loader />}
      {!isLoading && !user && <RegisterPage />}
      {user?.status == 'registered' && <RegisteredPage />}
      {user?.status == 'approved' && <MainPage />}
      {user?.status == 'rejected' && <RejectedPage />}
    </div>
  )
}
