import { Button } from '@/ui/Button'
import { LogOut } from 'lucide-react'
import { tgConfirm, removeCookieTgId, IS_WEB } from '@/utils/telegram'

export const ExitAppButton = () => {
  const handleClick = async () => {
    const isYes = await tgConfirm('Вы уверены, что хотите выйти?')

    if (isYes) {
      removeCookieTgId()
      document.location.reload()
    }
  }

  if (!IS_WEB) {
    return null
  }

  return (
    <Button
      variant="danger"
      className="text-sm mt-10"
      onClick={handleClick}
    >
      <LogOut size={14} />
      Выйти из приложения
    </Button>
  )
}
