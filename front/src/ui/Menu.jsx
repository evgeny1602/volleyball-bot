import { HomeMenuIcon } from '@/icons/HomeMenuIcon'
import { CalendarMenuIcon } from '@/icons/CalendarMenuIcon'
import { GamesMenuIcon } from '@/icons/GamesMenuIcon'
import { ProfileMenuIcon } from '@/icons/ProfileMenuIcon'
import { FaqMenuIcon } from '@/icons/FaqMenuIcon'
import { AdminMenuIcon } from '@/icons/AdminMenuIcon'
import { MenuContainer } from '@/ui/MenuContainer'
import { useState } from 'react'
import { cn } from '@/utils/cn'

const MENU_ITEMS = [
  { id: 'home', Icon: HomeMenuIcon },
  { id: 'games', Icon: GamesMenuIcon },
  { id: 'calendar', Icon: CalendarMenuIcon },
  //   { id: 'profile', Icon: ProfileMenuIcon },
  //   { id: 'faq', Icon: FaqMenuIcon },
  { id: 'admin', Icon: AdminMenuIcon },
]

export const Menu = ({ className }) => {
  const [activeTab, setActiveTab] = useState('home')

  const handleClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <MenuContainer className={className}>
      {MENU_ITEMS.map(({ id, Icon }) => (
        <Icon
          key={id}
          onClick={() => handleClick(id)}
          className={cn(
            'cursor-pointer transition-transform',
            activeTab != id ? 'active:scale-80' : ''
          )}
          variant={activeTab === id ? 'active' : 'default'}
        />
      ))}
    </MenuContainer>
  )
}
