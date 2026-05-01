import type { FC } from "react"

interface Props {
  x: number
  y: number
  visible: boolean
  accentRgb: string
}

const CursorSpotlight: FC<Props> = ({ x, y, visible, accentRgb }) => (
  <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl overflow-hidden"
       style={{ opacity: visible ? 1 : 0 }}>
    <div
      className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: x,
        top: y,
        background: `radial-gradient(circle, rgba(${accentRgb}, 0.12) 0%, transparent 70%)`,
        transition: "left 0.05s linear, top 0.05s linear",
      }}
    />
  </div>
)

export default CursorSpotlight