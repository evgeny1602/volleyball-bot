import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { RejectedPage } from '@/pages/RejectedPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useUser } from '@/hooks/useUser'
import { useTelegramUser } from './hooks/useTelegramUser'
import { useEffect, useState } from 'react'

export const App = () => {
  const { user, getUser, userIsLoading } = useUser()
  const { tgUserData, tgIsLoading } = useTelegramUser()
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      if (tgUserData) {
        await getUser(tgUserData.id)
        setIsLoading(false)
      }
    }

    initApp()
  }, [tgUserData])

  useEffect(() => {
    if (user?.role == 'admin') {
      setIsAdmin(true)
    }
  }, [user])

  return (
    <div className="flex flex-col min-h-screen gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800">
      {(userIsLoading || tgIsLoading || isLoading) && <Loader />}

      {!userIsLoading && !tgIsLoading && !user && (
        <RegisterPage
          onRegistered={async () => {
            await getUser(tgUserData.id)
          }}
        />
      )}
      {user?.status == 'registered' && <RegisteredPage />}
      {user?.status == 'approved' && <MainPage isAdmin={isAdmin} />}
      {user?.status == 'rejected' && <RejectedPage />}
    </div>
  )
}
