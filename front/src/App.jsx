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
      <button
        className="bg-bot-primary rounded-3xl w-50 hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgVibro('light')}
      >
        Test vibro Light
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgVibro('medium')}
      >
        Test vibro medium
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgVibro('heavy')}
      >
        Test vibro heavy
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgVibro('success')}
      >
        Test vibro success
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgVibro('error')}
      >
        Test vibro error
      </button>
    </div>
  )
}
