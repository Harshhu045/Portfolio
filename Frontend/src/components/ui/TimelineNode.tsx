import { motion } from "framer-motion"

export default function TimelineNode({ title }: { title: string }) {

  return (
    <div className="flex flex-col items-center text-center">

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-4 h-4 bg-white rounded-full"
      />

      <p className="text-xs text-white/60 mt-3">
        {title}
      </p>

    </div>
  )
}