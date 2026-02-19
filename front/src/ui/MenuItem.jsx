import { motion } from 'framer-motion'

export const MenuItem = ({ id, Icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className="relative flex items-center justify-center px-1 cursor-pointer outline-none"
  >
    {isActive && (
      <motion.div
        layoutId="menu-active"
        className="absolute inset-0 bg-bot-primary/10 dark:bg-bot-primary/30 rounded-full"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}

    <div className="relative z-10">
      <Icon variant={isActive ? 'active' : 'default'} />
    </div>
  </button>
)
