"use client"

import { useRef } from "react"
import type { FC } from "react"
import { motion, useInView } from "framer-motion"

const DifficultyDonut: FC<{ data: any }> = ({ data }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isIn = useInView(ref, { once: true })

    // ✅ REAL DATA FROM API
    const easy = data?.easySolved || 0
    const medium = data?.mediumSolved || 0
    const hard = data?.hardSolved || 0
    const total = easy + medium + hard

    const segments = [
        { label: "Easy", value: easy, color: "#34d399", pct: total ? easy / total : 0 },
        { label: "Medium", value: medium, color: "#38bdf8", pct: total ? medium / total : 0 },
        { label: "Hard", value: hard, color: "#fb7185", pct: total ? hard / total : 0 },
    ]

    const R = 52
    const CIRC = 2 * Math.PI * R
    let offset = 0

    return (
        <div ref={ref} className="flex items-center gap-8">

            {/* SVG Donut */}
            <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">

                    {/* Track */}
                    <circle
                        cx="60"
                        cy="60"
                        r={R}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="10"
                    />

                    {/* Segments */}
                    {segments.map((seg, i) => {
                        const dash = seg.pct * CIRC
                        const gap = CIRC - dash
                        const thisOffset = offset
                        offset += dash

                        return (
                            <motion.circle
                                key={i}
                                cx="60"
                                cy="60"
                                r={R}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth="10"
                                strokeDasharray={`${dash} ${gap}`}
                                strokeDashoffset={-thisOffset}
                                initial={{ strokeDasharray: `0 ${CIRC}` }}
                                animate={isIn ? { strokeDasharray: `${dash} ${gap}` } : {}}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{ opacity: 0.9 }}
                            />
                        )
                    })}
                </svg>

                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-mono font-bold text-lg">
                        {total}
                    </span>
                    <span className="text-white/30 text-[9px] font-mono">
                        solved
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-2.5 flex-1">
                {segments.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: seg.color }}
                            />
                            <span className="text-white/40 text-[11px] font-mono">
                                {seg.label}
                            </span>
                        </div>

                        <span className="text-white/60 text-[11px] font-mono tabular-nums">
                            {seg.value}{" "}
                            <span className="text-white/20">
                                ({Math.round(seg.pct * 100)}%)
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DifficultyDonut