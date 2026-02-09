import { HomeMenuIcon } from '@/icons/HomeMenuIcon'
import { CalendarMenuIcon } from '@/icons/CalendarMenuIcon'
import { GamesMenuIcon } from '@/icons/GamesMenuIcon'
import { ProfileMenuIcon } from '@/icons/ProfileMenuIcon'
import { FaqMenuIcon } from '@/icons/FaqMenuIcon'
import { AdminMenuIcon } from '@/icons/AdminMenuIcon'

export const menuItems = [
  { id: 'home', Icon: HomeMenuIcon },
  { id: 'games', Icon: GamesMenuIcon },
  { id: 'calendar', Icon: CalendarMenuIcon },
  //   { id: 'profile', Icon: ProfileMenuIcon },
  //   { id: 'faq', Icon: FaqMenuIcon },
  { id: 'admin', adminsOnly: true, Icon: AdminMenuIcon },
]
