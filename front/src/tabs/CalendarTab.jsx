import { GamesList } from '@/ui/GamesList'
import { WeeklyCalendar } from '@/ui/WeeklyCalendar'
import { useState } from 'react'

export const CalendarTab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <WeeklyCalendar
        className="mb-4"
        onSelect={handleDateSelect}
      />

      <GamesList filterDate={selectedDate} />
    </div>
  )
}
