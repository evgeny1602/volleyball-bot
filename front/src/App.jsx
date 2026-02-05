import { useEffect, useState } from 'react'
import { tgInit, tgGetAppData, tgVibro } from './utils/telegram'

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
    <div className="flex flex-col min-h-screen p-4 gap-6 select-none">
      <button className="bg-bot-grey-800 hover:cursor-pointer active:scale-[0.96] transition-transform">
        Test
      </button>

      {userData ? (
        <div>{JSON.stringify(userData, null, 2)}</div>
      ) : (
        <div>'No user data'</div>
      )}
    </div>
  )
}
