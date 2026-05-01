import type { ReactNode } from "react"
import { motion } from "framer-motion"

type Props = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = "" }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`
        relative 
        bg-zinc-900/60 
        border border-white/10 
        backdrop-blur-md
        p-6 
        rounded-xl 
        shadow-lg
        hover:shadow-xl
        hover:border-white/20
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}