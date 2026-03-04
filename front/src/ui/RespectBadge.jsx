import { Star } from 'lucide-react'

export const RespectBadge = ({ respect }) => {
  if (!respect) {
    return null
  }

  return (
    <div className="text-purple-600 dark:text-purple-500 text-xs flex gap-1 items-center font-semibold uppercase">
      <Star
        className="text-current"
        size={16}
      />
      {respect.name}
    </div>
  )
}
