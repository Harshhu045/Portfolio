import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function HoverCard({ children }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  )
}