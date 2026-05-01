"use client"

import { useRef } from "react"
import type { FC } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface Milestone {
    label: string
    desc: string
    done: boolean
}

const MILESTONES: Milestone[] = [
    { label: "Arrays & Basics", desc: "Foundation", done: true },
    { label: "Recursion & Trees", desc: "Core patterns", done: true },
    { label: "Graphs & BFS/DFS", desc: "Graph theory", done: true },
    { label: "Dynamic Programming", desc: "Optimal substructure", done: true },
    { label: "System Design", desc: "Scalable thinking", done: false },
]

const JourneyTimeline: FC = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] })
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
    const lineWidth = useTransform(smooth, [0, 1], ["0%", "100%"])

    return (
        <div ref={ref} className="relative py-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/8 -translate-y-1/2" />
            <motion.div
                style={{ width: lineWidth }}
                className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-linear-to-r from-white/60 via-white/30 to-transparent"
            />

            <div className="relative flex justify-between">
                {MILESTONES.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300
                            ${m.done
                                ? "bg-white border-white shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                                : "bg-transparent border-white/20 group-hover:border-white/40"
                            }`}
                        />
                        <div className={`absolute flex flex-col items-center ${i % 2 === 0 ? "top-6" : "-top-12"}`}>
                            <p className={`text-[10px] font-mono text-center whitespace-nowrap
                                ${m.done ? "text-white/60" : "text-white/20"}`}>
                                {m.label}
                            </p>
                            <p className="text-white/20 text-[9px] font-mono">{m.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default JourneyTimeline