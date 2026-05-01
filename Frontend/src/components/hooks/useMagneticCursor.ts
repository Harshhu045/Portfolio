"use client"

import { useEffect, useRef } from "react"

export const useMagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rxRef = useRef(-100)
  const ryRef = useRef(-100)

  useEffect(() => {
    let mx = -100, my = -100, rafId: number

    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px"
        cursorRef.current.style.top = my + "px"
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      rxRef.current = lerp(rxRef.current, mx, 0.12)
      ryRef.current = lerp(ryRef.current, my, 0.12)

      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + "px"
        ringRef.current.style.top = ryRef.current + "px"
      }

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    loop()

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ✅ RETURN REFS (instead of JSX)
  return {
    cursorRef,
    ringRef,
  }
}