import { Button } from '@/ui/Button'
import { LogOut } from 'lucide-react'
import { appConfirm, removeCookieTgId, IS_WEB } from '@/utils/tools'

export const ExitAppButton = () => {
  const handleClick = async () => {
    const isYes = await appConfirm('Вы уверены, что хотите выйти?')

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
