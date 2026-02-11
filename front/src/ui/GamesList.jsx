import { useGame } from '@/hooks/useGame'
import { Loader } from '@/ui/Loader'
import { NoGames } from '@/ui/NoGames'
import { GameCardShort } from '@/ui/GameCardShort'
import { useEffect } from 'react'

export const GamesList = ({ date }) => {
  const { games, getGames, gameIsLoading } = useGame()

  useEffect(() => {
    getGames()
  }, [])

  if (gameIsLoading) return <Loader />

  if (!gameIsLoading && games.length === 0) return <NoGames />

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {games.map((game, index) => (
        <GameCardShort
          key={index}
          game={game}
        />
      ))}
    </div>
  )
}
