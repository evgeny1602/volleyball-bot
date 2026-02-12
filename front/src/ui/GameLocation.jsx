import { House } from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'

export const GameLocation = ({ game }) => {
  return <GameInfoRow Icon={House}>{game.location_name}</GameInfoRow>
}
