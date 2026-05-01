"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

const Background: FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* aurora orb 1 */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-200 w-200 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.25), transparent 60%)",
        }}
        animate={{
          x: [0, 80, -20, 0],
          y: [0, 40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* aurora orb 2 */}
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 h-175 w-175 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.22), transparent 60%)",
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* aurora orb 3 */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(236,72,153,0.18), transparent 60%)",
        }}
        animate={{ rotate: [0, 180, 360] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default Background