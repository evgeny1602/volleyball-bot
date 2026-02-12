import { MapPin } from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'

export const GameAddress = ({ game }) => {
  return <GameInfoRow Icon={MapPin}>{game.location_address}</GameInfoRow>
}
