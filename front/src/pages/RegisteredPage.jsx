import { useConfetti } from '@/hooks/useConfetti'
import { useEffect } from 'react'

export const RegisteredPage = () => {
  const { fireConfetti } = useConfetti()

  useEffect(() => {
    fireConfetti()
  }, [])

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="text-center w-[70%] flex flex-col gap-4 font-semibold dark:text-gray-400">
        <p>🎉 Поздравляем! 🎉</p>
        <p>Ты теперь часть нашей большой дружной семьи!</p>
        <p>Ты сможешь войти как только администрация одобрит твою заявку.</p>
      </div>
    </div>
  )
}
