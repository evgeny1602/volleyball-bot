import { useEffect, useState } from 'react'
import {
  tgInit,
  tgGetAppData,
  tgAlert,
  tgConfirm,
  tgPopUp,
} from './utils/telegram'

export const Button = ({ variant = 'primary', onClick, children }) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-3xl font-medium w-full
        ${
          variant === 'primary'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-500 text-white'
        }
        hover:cursor-pointer active:scale-95 transition-transform
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

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
      <Button>Default button</Button>
    </div>
  )
}
