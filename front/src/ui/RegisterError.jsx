import { ErrorBubble } from '@/ui/ErrorBubble'

export const RegisterError = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null
  }

  return (
    <ErrorBubble
      onClose={onClose}
      durationMs={3000}
    >
      Все поля формы должны
      <br />
      быть заполнены!
    </ErrorBubble>
  )
}
