import { ShakingContainer } from '@/ui/ShakingContainer'
import { Button } from '@/ui/Button'
import { useState } from 'react'
import { tgVibro } from '@/utils/telegram'
import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

export const SubmitButton = ({ validation, onClick }) => {
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    if (validation.success) {
      onClick()
    } else {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      tgVibro('error')
    }
  }

  return (
    <ShakingContainer isShaking={isShaking}>
      <Button
        variant="success"
        className={cn(
          'w-full transition-all duration-300',
          !validation.success && 'opacity-70'
        )}
        onClick={handleClick}
      >
        <Check className="w-4 h-4" />
        {validation.success ? 'Сохранить' : 'Проверьте ошибки'}
      </Button>
    </ShakingContainer>
  )
}
