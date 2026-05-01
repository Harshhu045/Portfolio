import { useGameStore } from "../store/useGamestore"
import { motion, AnimatePresence } from "framer-motion"

export default function Overlay() {
  const mode = useGameStore((state) => state.mode)

  const contentMap: Record<string, string> = {
    PROJECTS: "Projects will appear here.",
    SKILLS: "Skills will appear here.",
    STACK: "Tech stack here.",
    DSA: "DSA problems solved here.",
    SYSTEMS: "System design content here.",
    CONTACT: "Contact + Resume here.",
    IDLE: "",
  }

  console.log("Current mode:", mode)


  return (
    <AnimatePresence>
      {mode !== "IDLE" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-8 py-6 rounded-xl text-white max-w-xl"
        >
          <h2 className="text-lg font-semibold mb-2">{mode}</h2>
          <p className="text-white/70">
            {contentMap[mode]}
          </p>
        </motion.div>
      )}

      
    </AnimatePresence>
  )
}
