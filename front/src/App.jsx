import { useEffect, useState } from 'react'
import { tgInit, tgGetAppData } from '@/utils/telegram'
import { RegisterPage } from '@/pages/RegisterPage'

export const App = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    tgInit()

    const appData = tgGetAppData()

    if (appData.user) {
      setUserData(appData.user)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen p-4 gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800">
      <RegisterPage />
    </div>
  )
}
