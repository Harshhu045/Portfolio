import { useEffect, useState } from "react"

export const useClock = () => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      const s = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      })
      setTime(s + " IST")
    }

    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  return time
}