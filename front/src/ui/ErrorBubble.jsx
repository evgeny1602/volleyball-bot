import { cn } from '@/utils/cn'
import { useState, useEffect } from 'react'

export const ErrorBubble = ({ children, onClose, durationMs = 5000 }) => {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)

    const hideTimer = setTimeout(() => {
      setIsShowing(false)
    }, durationMs - 500)

    const removeTimer = setTimeout(() => {
      if (onClose) onClose()
    }, durationMs)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }, [onClose])

  return (
    <div
      className={cn(
        'fixed bottom-3 bg-bot-danger shadow-md rounded-3xl text-white p-4 text-center transition-all duration-500 ease-in-out',
        isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {children}
    </div>
  )
}
