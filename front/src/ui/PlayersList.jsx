import { cn } from '@/utils/cn'
import { PlayerCard } from '@/ui/PlayerCard'

export const PlayersList = ({
  players,
  className,
  onRemove,
  onPromote,
  canPromote,
  isAdmin,
  isPastGame,
  isThankTime,
  gameId,
  onRespect,
  isJoined,
}) => {
  if (!players || players.length == 0) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {players.map((player) => (
        <PlayerCard
          key={player.tg_id}
          player={player}
          onRemove={onRemove}
          onPromote={onPromote}
          canPromote={canPromote}
          isAdmin={isAdmin}
          isPastGame={isPastGame}
          isThankTime={isThankTime}
          gameId={gameId}
          onRespect={onRespect}
          isJoined={isJoined}
        />
      ))}
    </div>
  )
}
