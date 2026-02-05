import { useEffect, useState } from 'react'
import { tgInit, tgGetAppData } from '@/utils/telegram'
import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { MoneyInput } from './ui/MoneyInput'

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
    <div className="flex flex-col min-h-screen p-4 gap-6 select-none items-center">
      <Button variant="success">Default button</Button>

      <Input label="Input test" />

      <DateInput label="Date input test" />

      <PhoneInput label="Phone input test" />

      <MoneyInput
        label="Money input test"
        className="w-35"
      />
    </div>
  )
}
