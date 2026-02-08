import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useTelegramUser } from '@/hooks/useTelegramUser'

export const App = () => {
  const { userStatus, setUserStatus } = useTelegramUser()

  return (
    <div className="flex flex-col min-h-screen gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800">
      {userStatus == 'loading' && <Loader />}
      {userStatus == 'unregistered' && (
        <RegisterPage onRegistered={() => setUserStatus('registered')} />
      )}
      {userStatus == 'registered' && <RegisteredPage />}
      {userStatus == 'approved' && <MainPage />}
    </div>
  )
}
