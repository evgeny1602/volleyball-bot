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

  // Обработчик завершения перетаскивания
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50 // порог чувствительности в пикселях
    if (info.offset.x > swipeThreshold) {
      handlePrevClick()
    } else if (info.offset.x < -swipeThreshold) {
      handleNextClick()
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center bg-white rounded-4xl shadow-sm overflow-hidden w-full pt-2 pb-4 touch-none',
        className
      )}
    >
      <div className="text-md font-light text-gray-600 uppercase tracking-tight">
        {monthYear}
      </div>

      <div className="flex items-center w-full px-4 h-13">
        <div className="shrink-0">
          <ArrowButton
            direction="left"
            onClick={handlePrevClick}
          />
        </div>

        <div className="relative flex-1 overflow-hidden mx-2 h-full">
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
          >
            <motion.div
              key={currentWeekStart.toISOString()}
              custom={direction}
              // Настройки Drag
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              // Анимации
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
                x: { type: 'spring', stiffness: 200, damping: 25 },
                opacity: { duration: 0.2 },
              }}
              className="flex justify-between items-center w-full h-full cursor-grab active:cursor-grabbing"
            >
              {weekDays.map((date, index) => {
                const isSelected = isSameDay(date, selectedDate)
                const isToday = isSameDay(date, new Date())

                return (
                  <button
                    key={date.toISOString()} // Лучше использовать дату как ключ
                    onClick={() => handleDateClick(date)}
                    className={cn(
                      'date-button shrink-0 w-9 h-9 flex flex-col items-center justify-center rounded-full transition-all duration-200',
                      isSelected && 'bg-bot-primary text-white'
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs tracking-tighter font-semibold pointer-events-none',
                        isSelected
                          ? 'text-white'
                          : isToday
                          ? 'text-bot-primary'
                          : 'text-gray-600'
                      )}
                    >
                      {date.getDate()}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] uppercase tracking-tighter font-regular pointer-events-none',
                        isSelected
                          ? 'text-white'
                          : isToday
                          ? 'text-bot-primary'
                          : 'text-gray-600'
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

        <div className="shrink-0">
          <ArrowButton
            direction="right"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  )
}
