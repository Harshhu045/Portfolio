import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  id?: string
  className?: string
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative py-28 px-6 overflow-hidden ${className}`}
    >
      {/* Background gradient layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}