import { useState, useEffect } from 'react'
import { tgInit, tgGetAppData } from '@/utils/telegram'
import { getUser } from '@/api/user'

export const useTelegramUser = () => {
  const [userData, setUserData] = useState(null)
  const [userStatus, setUserStatus] = useState('loading')

  useEffect(() => {
    const initApp = async () => {
      try {
        tgInit()

        const appData = tgGetAppData()

        if (appData?.user) {
          setUserData(appData.user)

          const data = await getUser(appData.user.id)

          setUserStatus(data?.exists ? data.user.status : 'unregistered')
        } else {
          setUserStatus('unregistered')
        }
      } catch (error) {
        console.error('Ошибка инициализации приложения:', error)
        setUserStatus('unregistered')
      }
    }

    initApp()
  }, [])

  return { userData, userStatus, setUserStatus }
}
