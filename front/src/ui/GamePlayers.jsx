import { Users } from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'

export const GamePlayers = ({ game }) => {
  return (
    <GameInfoRow
      Icon={Users}
      className="text-bot-grey-600"
    >
      {game.players?.length || 0} из {game.max_players} чел.
    </GameInfoRow>
  )
}
