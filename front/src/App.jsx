import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'

export const App = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()

    if (WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, [])

  const handleMainAction = () => {
    WebApp.HapticFeedback.impactOccurred('medium')
    WebApp.showAlert(`Виброотклик сработал!`)
  }

  const handleClose = () => {
    WebApp.HapticFeedback.notificationOccurred('warning')
    setTimeout(() => WebApp.close(), 200)
  }

  return (
    <div className="flex flex-col min-h-screen p-4 gap-6 select-none">
      <header className="text-center mt-4">
        <h1 className="text-2xl font-bold italic text-tg-link">TMA Haptic</h1>
      </header>

      {userData && (
        <div
          className="bg-tg-secondary p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-black/5"
          onClick={() => WebApp.HapticFeedback.selectionChanged()}
        >
          {userData.photo_url ? (
            <img
              src={userData.photo_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full ring-2 ring-tg-primary"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-tg-primary flex items-center justify-center text-tg-primary-text text-xl font-bold">
              {userData.first_name[0]}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight">
              {userData.first_name}
            </span>
            <span className="text-tg-hint text-sm">@{userData.username}</span>
          </div>
        </div>
      )}

      <div className="mt-auto space-y-3 pb-6">
        <button
          onClick={handleMainAction}
          className="w-full py-4 bg-tg-primary text-tg-primary-text rounded-xl font-bold active:scale-[0.96] transition-transform shadow-lg"
        >
          Нажми (Impact Medium)
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              WebApp.HapticFeedback.notificationOccurred('success')
              WebApp.showAlert('Успех!')
            }}
            className="py-3 bg-green-500 text-white rounded-xl text-sm font-medium"
          >
            Success Haptic
          </button>
          <button
            onClick={() => {
              WebApp.HapticFeedback.notificationOccurred('error')
              WebApp.showConfirm('Ошибка?')
            }}
            className="py-3 bg-red-500 text-white rounded-xl text-sm font-medium"
          >
            Error Haptic
          </button>
        </div>

        <button
          onClick={handleClose}
          className="w-full py-3 text-tg-hint hover:text-red-500 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
