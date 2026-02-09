import { useState } from 'react'
import { MainTab } from '@/tabs/MainTab'
import { AdminTab } from '@/tabs/AdminTab'
import { MyGamesTab } from '@/tabs/MyGamesTab'
import { CalendarTab } from '@/tabs/CalendarTab'
import { MenuContainer } from '@/ui/MenuContainer'
import { menuItems } from '@/config/menuItems'
import { useUser } from '@/hooks/useUser'

const tabs = {
  home: MainTab,
  admin: AdminTab,
  games: MyGamesTab,
  calendar: CalendarTab,
}

export function MainPage() {
  const [tabId, setTabId] = useState('home')
  const { isAdmin } = useUser()
  const Tab = tabs[tabId]

  return (
    <div className="flex flex-col items-center gap-20 relative h-dvh w-full">
      <Tab />

      <MenuContainer>
        {menuItems
          .filter((item) => (!isAdmin && !item.adminsOnly) || isAdmin)
          .map(({ id, Icon }) => (
            <Icon
              key={id}
              onClick={() => setTabId(id)}
              variant={tabId === id ? 'active' : 'default'}
            />
          ))}
      </MenuContainer>
    </div>
  )
}
