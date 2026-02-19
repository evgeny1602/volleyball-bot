import { motion, AnimatePresence } from 'framer-motion'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'
import { GrUser, GrUserFemale } from 'react-icons/gr'

const OPTIONS = [
  { id: 'male', label: 'Чемпион', Icon: GrUser },
  { id: 'female', label: 'Чемпионка', Icon: GrUserFemale },
]

export const GenderInput = ({ label, onChange, className, value }) => {
  const handleChange = (id) => {
    tgVibro('medium')
    onChange?.(id)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="flex w-full bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-300 dark:border-gray-900 relative overflow-hidden">
        {OPTIONS.map(({ id, label, Icon }) => {
          const isActive = value === id

          return (
            <label
              key={id}
              className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-full cursor-pointer select-none relative"
            >
              <input
                type="radio"
                className="sr-only"
                name="gender-selection"
                checked={isActive}
                onChange={() => handleChange(id)}
              />

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-bot-primary rounded-full shadow-sm z-0"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      duration: 0.4,
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="relative z-10 flex items-center gap-2"
                initial={false}
                animate={{
                  color: isActive ? '#FFFFFF' : '#6b7280',
                }}
                transition={{
                  duration: 0.3,
                  delay: isActive ? 0.05 : 0,
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
