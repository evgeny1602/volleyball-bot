import { useEffect, useRef, useState } from 'react'
import { useNews } from '@/hooks/news'
import { Loader } from '@/ui/Loader'
import { NewSliderCard } from '@/ui/NewSliderCard'
import { cn } from '@/utils/cn'

export const MainNewsSlider = () => {
  const { data, isLoading } = useNews()
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!data?.data?.length || isLoading || isPaused) return

    const interval = setInterval(() => {
      const slider = scrollRef.current
      if (!slider) return

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth

      if (slider.scrollLeft >= maxScrollLeft - 1) {
        slider.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [data, isLoading, isPaused])

  if (isLoading) return <Loader />

  return (
    <div className="w-full relative">
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={cn(
          'w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth',
          '[-ms-overflow-style:none] [scrollbar-width:none]',
          '[&::-webkit-scrollbar]:hidden scrollable-content'
        )}
      >
        {data.data.map((item) => (
          <div
            key={item.id}
            className="min-w-full snap-center shrink-0"
          >
            <NewSliderCard data={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
