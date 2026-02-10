import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

export const MENU_ITEMS = [
  { id: 'home', Icon: HomeMenuIcon },
  { id: 'games', Icon: GamesMenuIcon },
  { id: 'calendar', Icon: CalendarMenuIcon },
  { id: 'admin', adminsOnly: true, Icon: AdminMenuIcon },
]

export function MainPage() {
  const [tabId, setTabId] = useState('home')
  const { isAdmin } = useUser()
  const Tab = TABS[tabId]

  return (
    <div className="flex flex-col items-center gap-20 relative h-dvh w-full">
      <Tab />

      <MenuContainer>
        {MENU_ITEMS.filter(
          (item) => (!isAdmin && !item.adminsOnly) || isAdmin
        ).map(({ id, Icon }) => {
          const isActive = tabId === id

          return (
            <div
              key={id}
              onClick={() => setTabId(id)}
              className="relative flex items-center justify-center py-0 px-1 cursor-pointer transition-colors"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="menu-active"
                    className="absolute inset-0 bg-bot-primary/10 rounded-full z-0"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <Icon variant={isActive ? 'active' : 'default'} />
              </div>
            </div>
          )
        })}
      </MenuContainer>
    </div>
  )
}
