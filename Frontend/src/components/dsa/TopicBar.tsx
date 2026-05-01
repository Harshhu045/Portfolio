"use client"

import { useRef } from "react"
import type { FC } from "react"
import { motion, useInView } from "framer-motion"

interface Topic {
    name: string
    solved: number
    total: number
    difficulty: "Easy" | "Medium" | "Hard"
    color: string
    accentRgb: string
}

const DIFFICULTY_CONFIG = {
    Easy: { label: "Easy", color: "text-emerald-400", border: "border-emerald-400/20", bg: "bg-emerald-400/8" },
    Medium: { label: "Medium", color: "text-sky-400", border: "border-sky-400/20", bg: "bg-sky-400/8" },
    Hard: { label: "Hard", color: "text-rose-400", border: "border-rose-400/20", bg: "bg-rose-400/8" },
}

const TopicBar: FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    const pct = Math.round((topic.solved / topic.total) * 100)
    const diff = DIFFICULTY_CONFIG[topic.difficulty]

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="group space-y-1.5"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-white/60 text-[11px] font-mono group-hover:text-white/90 transition-colors duration-200">
                        {topic.name}
                    </span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${diff.color} ${diff.border}`}>
                        {diff.label}
                    </span>
                </div>
                <span className="text-white/30 text-[10px] font-mono tabular-nums">
                    {topic.solved}/{topic.total}
                </span>
            </div>

            <div className="relative h-1 rounded-full bg-white/6 overflow-hidden">
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-full origin-left"
                    style={{
                        width: `${pct}%`,
                        backgroundColor: `rgba(${topic.accentRgb}, 0.7)`,
                        boxShadow: `0 0 8px rgba(${topic.accentRgb}, 0.4)`,
                    }}
                />
            </div>
        </motion.div>
    )
}

export default TopicBar