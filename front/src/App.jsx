import { useEffect, useState } from 'react'
import { tgInit, tgGetAppData } from '@/utils/telegram'
import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'

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
      <Button variant="success">Default button</Button>

      <Input label="Input test" />
    </div>
  )
}
