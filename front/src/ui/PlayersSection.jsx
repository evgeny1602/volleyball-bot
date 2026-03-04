import { PlayersList } from '@/ui/PlayersList'
import { ListDivider } from '@/ui/ListDivider'

const SectionHeader = ({ mainCount, reserveCount }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 border-b-3 border-bot-primary dark:border-bot-primary-dark p-2 text-center font-semibold flex items-center justify-center gap-2 dark:text-gray-300">
      Участники
      <span className="text-xs font-regular opacity-70">
        <span className="mr-0.5">[</span>
        {mainCount} + {reserveCount}
        <span className="ml-0.5">]</span>
      </span>
    </div>
  )
}

const SectionBodyContainer = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 border-gray-200 dark:border-gray-700 rounded-b-3xl border">
      {children}
    </div>
  )
}

export const PlayersSection = ({
  players,
  onRemove,
  onPromote,
  canPromote,
  mainCount,
  reserveCount,
  isAdmin,
  isPastGame,
  isThankTime,
  gameId,
  onRespect,
  isJoined,
}) => {
  if (!players || players.length === 0) {
    return null
  }

  const mainPlayers = players.filter((p) => p.status === 'main')
  const reservePlayers = players.filter((p) => p.status === 'reserve')
  const hasMainPlayers = mainPlayers.length > 0
  const hasReservePlayers = reservePlayers.length > 0

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden">
      <SectionHeader
        mainCount={mainCount}
        reserveCount={reserveCount}
      />

      <SectionBodyContainer>
        {hasMainPlayers && (
          <ListDivider className="-mt-1 mb-4">Основа [{mainCount}]</ListDivider>
        )}

        <PlayersList
          players={mainPlayers}
          onRemove={onRemove}
          isAdmin={isAdmin}
          isPastGame={isPastGame}
          isThankTime={isThankTime}
          gameId={gameId}
          onRespect={onRespect}
          isJoined={isJoined}
        />

        {hasReservePlayers && (
          <ListDivider className="mt-3 mb-5">
            Резерв [{reserveCount}]
          </ListDivider>
        )}

        <PlayersList
          players={reservePlayers}
          onRemove={onRemove}
          onPromote={onPromote}
          canPromote={canPromote}
          isAdmin={isAdmin}
          isPastGame={isPastGame}
        />
      </SectionBodyContainer>
    </div>
  )
}
