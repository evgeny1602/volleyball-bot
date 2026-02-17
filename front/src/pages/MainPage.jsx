import { useState, useMemo } from 'react'
import { MainTab } from '@/tabs/MainTab'
import { AdminTab } from '@/tabs/AdminTab'
import { MyGamesTab } from '@/tabs/MyGamesTab'
import { CalendarTab } from '@/tabs/CalendarTab'
import { MenuContainer } from '@/ui/MenuContainer'
import { HomeMenuIcon } from '@/icons/HomeMenuIcon'
import { CalendarMenuIcon } from '@/icons/CalendarMenuIcon'
import { GamesMenuIcon } from '@/icons/GamesMenuIcon'
import { AdminMenuIcon } from '@/icons/AdminMenuIcon'
import { useCurrentUser } from '@/hooks/users'
import { MenuItem } from '@/ui/MenuItem'

const TABS = {
  home: MainTab,
  admin: AdminTab,
  games: MyGamesTab,
  calendar: CalendarTab,
}

const MENU_ITEMS_CONFIG = [
  { id: 'home', Icon: HomeMenuIcon },
  { id: 'games', Icon: GamesMenuIcon },
  { id: 'calendar', Icon: CalendarMenuIcon },
  { id: 'admin', adminsOnly: true, Icon: AdminMenuIcon },
]

export function MainPage() {
  const [tabId, setTabId] = useState('home')
  const { user } = useCurrentUser()

  const visibleMenuItems = useMemo(() => {
    return MENU_ITEMS_CONFIG.filter(
      (item) => !item.adminsOnly || user.role == 'admin'
    )
  }, [user])

  const ActiveTab = TABS[tabId]

  return (
    <div className="flex flex-col items-center justify-start relative h-dvh w-full overflow-hidden">
      <ActiveTab />

      <MenuContainer>
        {visibleMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={tabId === item.id}
            onClick={setTabId}
          />
        ))}
      </MenuContainer>
    </div>
  )
}
