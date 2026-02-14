import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { ArrowButton } from '@/ui/ArrowButton'
import { getWeekDays, getMonthYear, isSameDay } from '@/utils/formatters'
import { tgVibro } from '@/utils/telegram'

export const WeeklyCalendar = ({ className, onSelect }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [direction, setDirection] = useState(0)

  const weekDays = getWeekDays(currentWeekStart)
  const monthYear = getMonthYear(currentWeekStart)

  const changeWeek = (offset) => {
    setDirection(offset)
    const nextWeek = new Date(currentWeekStart)
    nextWeek.setDate(currentWeekStart.getDate() + offset * 7)
    setCurrentWeekStart(nextWeek)
  }

  const handlePrevClick = () => {
    tgVibro('medium')
    changeWeek(-1)
  }

  const handleNextClick = () => {
    tgVibro('medium')
    changeWeek(1)
  }

  const handleDateClick = (date) => {
    tgVibro('medium')
    setSelectedDate(date)
    onSelect?.(date)
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center bg-white rounded-4xl shadow-sm overflow-hidden w-full pt-2 pb-4',
        className
      )}
    >
      {/* Заголовок */}
      <div className="text-md font-light text-bot-grey-800 uppercase tracking-tight">
        {monthYear}
      </div>

      <div className="flex items-center w-full px-4 h-13">
        <ArrowButton
          direction="left"
          onClick={handlePrevClick}
        />

        {/* Контейнер с анимацией */}
        <div className="relative flex-1 overflow-hidden mx-2">
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
          >
            <motion.div
              key={currentWeekStart.toISOString()}
              custom={direction}
              variants={{
                enter: (direction) => ({
                  x: direction > 0 ? '100%' : '-100%',
                  opacity: 0,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: (direction) => ({
                  x: direction > 0 ? '-100%' : '100%',
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 150, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex justify-between items-center w-full"
            >
              {weekDays.map((date, index) => {
                const isSelected = isSameDay(date, selectedDate)
                const isToday = isSameDay(date, new Date())

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={cn(
                      'date-button w-8 h-8 flex flex-col items-center justify-center rounded-[50%] transition-all duration-200',
                      isSelected && 'bg-bot-primary text-white'
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs tracking-tighter font-semibold',
                        isSelected
                          ? 'text-white'
                          : isToday
                          ? 'text-bot-primary'
                          : 'text-bot-grey-800'
                      )}
                    >
                      {date.getDate()}
                    </span>

                    <span
                      className={cn(
                        'text-[10px] uppercase tracking-tighter font-regular',
                        isSelected
                          ? 'text-white'
                          : isToday
                          ? 'text-bot-primary'
                          : 'text-bot-grey-800'
                      )}
                    >
                      {date.toLocaleString('ru-RU', { weekday: 'short' })}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <ArrowButton
          direction="right"
          onClick={handleNextClick}
        />
      </div>
    </div>
  )
}
