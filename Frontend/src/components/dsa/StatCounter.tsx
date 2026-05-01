"use client"

import {
    useRef,
    useState,
    useEffect
} from "react"
import type { FC, CSSProperties } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
    value: number
    suffix: string
    label: string
    sublabel: string
    color: string
    accentRgb: string
}

const StatCounter: FC<{ stat: Stat; delay: number }> = ({ stat, delay }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    const [display, setDisplay] = useState(0)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if (!inView) return
        const timeout = setTimeout(() => {
            const duration = 1400
            const start = performance.now()
            const tick = (now: number) => {
                const p = Math.min((now - start) / duration, 1)
                const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
                setDisplay(Math.round(eased * stat.value))
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, delay)
        return () => clearTimeout(timeout)
    }, [inView, stat.value, delay])

    return (
        <motion.div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-white/[0.07] bg-white/2
                       backdrop-blur-sm p-5 overflow-hidden cursor-default
                       transition-all duration-300"
            style={{
                boxShadow: hovered
                    ? `0 0 40px rgba(${stat.accentRgb},0.1), inset 0 0 0 1px rgba(${stat.accentRgb},0.15)`
                    : "none",
                borderColor: hovered ? `rgba(${stat.accentRgb},0.2)` : "rgba(255,255,255,0.07)",
            } as CSSProperties}
        >
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
                transition={{ duration: 0.35 }}
                className="absolute -top-6 -left-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                style={{ backgroundColor: `rgba(${stat.accentRgb},0.25)` }}
            />

            <div className="relative space-y-3">
                <div className="flex items-end gap-0.5">
                    <span className="text-4xl font-mono font-bold text-white tabular-nums leading-none">
                        {display}
                    </span>
                    <span className={`text-2xl font-mono font-bold leading-none mb-0.5 ${stat.color}`}>
                        {stat.suffix}
                    </span>
                </div>

                <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-white/25 text-[10px] font-mono mt-0.5">{stat.sublabel}</p>
                </div>

                <motion.div
                    animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="h-px rounded-full origin-left"
                    style={{ backgroundColor: `rgba(${stat.accentRgb},0.6)` }}
                />
            </div>
        </motion.div>
    )
}

export default StatCounter