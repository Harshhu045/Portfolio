import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function AnimatedHeading({ children }: Props) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-5xl md:text-6xl font-semibold tracking-tight"
    >
      {children}
    </motion.h2>
  )
}