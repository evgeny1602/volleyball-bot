import { useGame } from '@/hooks/useGame'
import { Loader } from '@/ui/Loader'
import { NoGames } from '@/ui/NoGames'
import { GameCardShort } from '@/ui/GameCardShort'
import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser'

export const GamesList = () => {
  const { games, getGames, gameIsLoading } = useGame()
  const { user, userIsLoading } = useUser()

  useEffect(() => {
    getGames()
  }, [])

  if (gameIsLoading || userIsLoading) return <Loader />

  if (!gameIsLoading && !userIsLoading && games.length === 0) return <NoGames />

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {games.map((game, index) => (
        <GameCardShort
          key={index}
          game={game}
          onChange={getGames}
          user={user}
        />
      ))}
    </div>
  )
}
