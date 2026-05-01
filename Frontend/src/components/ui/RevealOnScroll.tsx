import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function RevealOnScroll({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}