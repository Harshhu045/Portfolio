import type { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  isActive: boolean
}

const FlowConnector: FC<Props> = ({ isActive }) => (
  <div className="relative flex flex-col items-center h-10">
    <div className="w-px h-full bg-white/10" />

    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          style={{ originY: 0 }}
          className="absolute inset-0 w-px bg-linear-to-b from-white via-white/50 to-transparent mx-auto"
        />
      )}
    </AnimatePresence>

    {isActive && (
      <motion.div
        animate={{ y: [0, 40] }}
        transition={{ duration: 0.5, ease: "easeIn", repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-white"
      />
    )}
  </div>
)

export default FlowConnector