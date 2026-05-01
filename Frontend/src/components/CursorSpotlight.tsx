import { useEffect } from "react"

export default function CursorSpotlight() {

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--y", `${e.clientY}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }

  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 40%)"
        }}
      />
    </div>
  )
}