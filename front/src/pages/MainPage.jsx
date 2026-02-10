import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MainTab } from '@/tabs/MainTab'
import { AdminTab } from '@/tabs/AdminTab'
import { MyGamesTab } from '@/tabs/MyGamesTab'
import { CalendarTab } from '@/tabs/CalendarTab'
import { MenuContainer } from '@/ui/MenuContainer'
import { useUser } from '@/hooks/useUser'
import { HomeMenuIcon } from '@/icons/HomeMenuIcon'
import { CalendarMenuIcon } from '@/icons/CalendarMenuIcon'
import { GamesMenuIcon } from '@/icons/GamesMenuIcon'
import { AdminMenuIcon } from '@/icons/AdminMenuIcon'

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

const MenuItem = ({ id, Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className="relative flex items-center justify-center px-1 cursor-pointer outline-none"
  >
    {isActive && (
      <motion.div
        layoutId="menu-active"
        className="absolute inset-0 bg-bot-primary/10 rounded-full"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}

    <div className="relative z-10">
      <Icon variant={isActive ? 'active' : 'default'} />
    </div>
  </button>
)

export function MainPage() {
  const [tabId, setTabId] = useState('home')
  const { isAdmin } = useUser()

  const visibleMenuItems = useMemo(() => {
    return MENU_ITEMS_CONFIG.filter((item) => !item.adminsOnly || isAdmin)
  }, [isAdmin])

  const ActiveTab = TABS[tabId]

  return (
    <div className="flex flex-col items-center relative h-dvh w-full overflow-hidden">
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
