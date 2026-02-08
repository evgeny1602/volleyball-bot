import { useState, useEffect } from 'react'
import { tgInit, tgGetAppData } from '@/utils/telegram'

export const useTelegramUser = () => {
  const [tgUserData, setTgUserData] = useState(null)
  const [tgIsLoading, setTgIsLoading] = useState(false)

  useEffect(() => {
    try {
      setTgIsLoading(true)

      tgInit()

      const appData = tgGetAppData()

      if (appData?.user) {
        setTgUserData(appData.user)
        setTgIsLoading(false)
      }
    } catch (error) {
      console.error('Ошибка инициализации приложения:', error)
    }
  }, [])

  return { tgUserData, tgIsLoading }
}
