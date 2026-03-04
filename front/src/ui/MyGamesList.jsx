import { useState, useMemo } from 'react'
import { useGames } from '@/hooks/games'
import { useCurrentUser } from '@/hooks/users'
import { getFilteredGames } from '@/utils/gameHelpers'
import { Volleyball, History } from 'lucide-react'
import { GamesList } from '@/ui/GamesList'
import { NoGames } from '@/ui/NoGames'
import { BaseRadio } from '@/ui/BaseRadio'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'

export const MyGamesList = ({ lookBackDays = 183 }) => {
  const { data, isLoading: isGamesLoading } = useGames()
  const { user, isLoading: isUserLoading } = useCurrentUser()
  const [mode, setMode] = useState('active')

  const games = useMemo(
    () =>
      getFilteredGames({
        games: data?.data,
        userId: user?.id,
        mode,
        lookBackDays,
      }),
    [data?.data, user?.id, mode, lookBackDays]
  )

  if (isGamesLoading || isUserLoading) {
    return <LoaderFullScreen />
  }

  return (
    <div className="w-full p-4 h-full flex-1 flex flex-col gap-8">
      <BaseRadio
        value={mode}
        options={[
          { id: 'active', label: 'Активные', Icon: Volleyball },
          { id: 'past', label: 'Прошедшие', Icon: History },
        ]}
        onChange={setMode}
      />

      {games.length > 0 ? (
        <GamesList
          games={games}
          isLoading={isGamesLoading || isUserLoading}
        />
      ) : (
        <NoGames mode={mode} />
      )}
    </div>
  )
}
