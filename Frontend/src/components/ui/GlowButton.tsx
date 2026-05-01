import type  { ReactNode } from "react"
import { motion } from "framer-motion"

type Props = {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export default function GlowButton({
  children,
  onClick,
  className = "",
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative
        px-6 py-3
        rounded-lg
        bg-white/5
        border border-white/20
        text-white
        backdrop-blur-md
        transition-all
        hover:border-white/40
        hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}