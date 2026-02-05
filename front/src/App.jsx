import { useEffect, useState } from 'react'
import {
  tgInit,
  tgGetAppData,
  tgAlert,
  tgConfirm,
  tgPopUp,
} from './utils/telegram'

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
        className="bg-bot-primary rounded-3xl w-50 text-white hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgAlert('Test Alert')}
      >
        Test Alert
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 text-white hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() => tgConfirm('Test Confirm')}
      >
        Test Confirm
      </button>

      <button
        className="bg-bot-primary rounded-3xl w-50 text-white hover:cursor-pointer active:scale-[0.96] transition-transform"
        onClick={() =>
          tgPopUp({
            title: 'Test Pop Up',
            message: 'Test Pop Up------Test Pop Up',
            buttons: [
              { id: 'all', type: 'default', text: 'Все' },
              { id: 'none', type: 'destructive', text: 'Никаких' },
              { type: 'cancel' },
            ],
          })
        }
      >
        Test Pop Up
      </button>
    </div>
  )
}
