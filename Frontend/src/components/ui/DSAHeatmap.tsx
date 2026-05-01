import { useEffect, useState } from "react"
import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { motion } from "framer-motion"

type HeatmapData = {
  date: string
  count: number
}

export default function DSAHeatmap() {

const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([])

useEffect(() => {
  fetch("http://localhost:3001/api/leetcode/harsh_hu")
    .then(res => res.json())
    .then(data => {
      const calendar = data.submissionCalendar || {}

      const formatted = Object.entries(calendar).map(([timestamp, count]) => ({
        date: new Date(Number(timestamp) * 1000)
          .toISOString()
          .split("T")[0],
        count: Number(count),
      }))

      setHeatmapData(formatted)
    })
}, [])

return (

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="mt-10"
>

  <h3 className="text-sm text-white/70 mb-4">
    Problem Solving Activity
  </h3>

  <CalendarHeatmap
    startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
    endDate={new Date()}
    values={heatmapData}
    classForValue={(value) => {

      if (!value) return "color-empty"
      if (value.count >= 4) return "color-github-4"
      if (value.count >= 3) return "color-github-3"
      if (value.count >= 2) return "color-github-2"
      if (value.count >= 1) return "color-github-1"

      return "color-empty"
    }}
  />

</motion.div>


)
}
