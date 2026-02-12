import { CreditCard } from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'

export const GamePrice = ({ game }) => {
  return (
    <GameInfoRow
      Icon={CreditCard}
      className="text-black"
    >
      {game.price} ₽
    </GameInfoRow>
  )
}
