import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { RejectedPage } from '@/pages/RejectedPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useCurrentUser } from '@/hooks/users'
import { useEffect } from 'react'
import { cn } from '@/utils/cn'
import { getCookieTgId } from '@/utils/tools'

const setCookieTelegram = () => {
  const savedTgId = getCookieTgId()
  if (!savedTgId) {
    const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || null
    if (tgId) {
      document.cookie = `tg_id=${tgId}; path=/; max-age=86400; SameSite=Lax`
    }
  }
}

export const App = () => {
  const { user, isLoading } = useCurrentUser()

  useEffect(() => {
    setCookieTelegram()

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = '0'
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.bottom = '0'

    const handleTouchMove = (e) => {
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
    <div className="flex w-full justify-center bg-gray-100">
      <div
        className={cn(
          'text-gray-600 bg-gray-100 dark:bg-gray-900',
          'flex flex-col h-screen gap-2 select-none items-center',
          'scrollable-content overflow-y-auto w-120'
        )}
      >
        {isLoading && <Loader />}
        {!isLoading && !user && <RegisterPage />}
        {user?.status == 'registered' && <RegisteredPage />}
        {user?.status == 'approved' && <MainPage />}
        {user?.status == 'rejected' && <RejectedPage />}
      </div>
    </div>
  )
}
