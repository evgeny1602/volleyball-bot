import { GamesList } from '@/ui/GamesList'
import { WeeklyCalendar } from '@/ui/WeeklyCalendar'
import { useState } from 'react'
import { useGames } from '@/hooks/games'
import { getDateStr } from '@/utils/formatters'

export const CalendarTab = () => {
  const { data, isLoading } = useGames()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const games =
    data?.data.filter(
      (game) => game.start_datetime.split(' ')[0] == getDateStr(selectedDate)
    ) || []

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <WeeklyCalendar
        className="mb-4"
        onSelect={setSelectedDate}
      />

      <GamesList
        games={games}
        isLoading={isLoading}
      />
    </div>
  )
}
