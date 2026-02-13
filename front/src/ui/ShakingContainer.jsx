import { motion } from 'framer-motion'

export const ShakingContainer = ({ children, isShaking }) => (
  <motion.div
    animate={isShaking ? { x: [-3, 3, -3, 3, 0] } : { x: 0 }}
    transition={{
      duration: 0.2,
      ease: 'linear',
    }}
  >
    {children}
  </motion.div>
)
