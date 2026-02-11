import { useMemo } from 'react'
import {
  dateFormatGameCard,
  dayOfWeekFameCard,
  timeFormatGameCard,
} from '@/utils/formatters'

export const GameCardShortLeft = ({ startDatetime, duration }) => {
  const timeData = useMemo(() => {
    const start = new Date(startDatetime)
    const end = new Date(start.getTime() + duration * 60000)

    return {
      date: dateFormatGameCard(start),
      day: dayOfWeekFameCard(start.getDay()),
      start: timeFormatGameCard(start),
      end: timeFormatGameCard(end),
    }
  }, [startDatetime, duration])

  return (
    <div className="bg-bot-grey-200 py-3 w-18 border-r-3 pr-3 border-bot-primary flex flex-col justify-between items-end shrink-0">
      <div className="flex flex-col items-center">
        <span className="text-bot-grey-500 leading-none text-xs">
          {timeData.date}
        </span>

        <span className="font-bold text-black text-2xl leading-none font-mono">
          {timeData.day}
        </span>
      </div>

      <div className="flex flex-col items-center font-semibold text-black text-xs leading-none">
        <span>{timeData.start}</span>

        <span className="text-bot-grey-500 -mt-0.5 -mb-0.5">-</span>

        <span>{timeData.end}</span>
      </div>
    </div>
  )
}
