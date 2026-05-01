import type { FC } from "react"
import { motion } from "framer-motion"

interface Props {
  src: string
  alt: string
  hovered: boolean
}

const ImageReveal: FC<Props> = ({ src, alt, hovered }) => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl">
    <motion.div
      animate={{
        clipPath: hovered
          ? "inset(0% 0% 0% 0% round 16px)"
          : "inset(100% 0% 0% 0% round 16px)",
      }}
      transition={{ duration: 0.55 }}
      className="absolute inset-0"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${src})`, backgroundSize: "cover" }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </motion.div>
  </div>
)

export default ImageReveal