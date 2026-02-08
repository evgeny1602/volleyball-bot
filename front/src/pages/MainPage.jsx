import { Menu } from '@/ui/Menu'
import { useState } from 'react'
import { MainTab } from '@/tabs/MainTab'
import { AdminTab } from '@/tabs/AdminTab'
import { MyGamesTab } from '@/tabs/MyGamesTab'
import { CalendarTab } from '@/tabs/CalendarTab'

export function MainPage() {
  const [tabId, setTabId] = useState('home')

  return (
    <div className="flex flex-col items-center gap-20 relative h-dvh w-full">
      {tabId === 'home' && <MainTab />}
      {tabId === 'admin' && <AdminTab />}
      {tabId === 'games' && <MyGamesTab />}
      {tabId === 'calendar' && <CalendarTab />}

      <Menu
        className={'fixed bottom-5'}
        onSelect={setTabId}
      />
    </div>
  )
}
