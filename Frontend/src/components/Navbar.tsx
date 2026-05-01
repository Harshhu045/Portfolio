import { motion } from "framer-motion"

export default function Navbar({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0
      }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center px-10 z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: visible ? 1 : 0 }}
        transition={{ delay: 0.4 }}
        className="w-6 h-6 bg-white rounded-full mr-3"
      />
      <span className="text-sm tracking-widest text-white/60">
        PAWN PROGRESSION
      </span>
    </motion.div>
  )
}