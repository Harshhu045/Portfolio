"use client"

import type { FC } from "react"
import { useMagneticCursor } from "../hooks/useMagneticCursor"

const CustomCursor: FC = () => {
  const { cursorRef, ringRef } = useMagneticCursor()

  return (
    <>
      <div
        ref={cursorRef}
        data-cursor
        className="pointer-events-none fixed z-9999 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[width,height,background] duration-200 md:block [&.expanded]:h-12 [&.expanded]:w-12 [&.expanded]:bg-transparent [&.expanded]:border [&.expanded]:border-white/40"
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed z-9998 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 transition-[opacity] duration-300 md:block [&.hidden]:opacity-0"
      />
    </>
  )
}

export default CustomCursor