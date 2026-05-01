"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { CountNum } from "./CountNum"
import { ACCENT, FAINT } from "../constant/landing.constants"

const STATS = [
    { val: 350, sfx: "+",  label: "Problems"  },
    { val: 1500, sfx: "",  label: "LC Rating"  },
    { val: 18,  sfx: "+",  label: "Projects"   },
    { val: 90,  sfx: "d",  label: "Streak"     },
]

export const StatsBar: FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.55, duration: 0.6 }}
        className="grid grid-cols-4"
        style={{ borderTop: `1px solid ${FAINT}`, borderBottom: `1px solid ${FAINT}` }}
    >
        {STATS.map((s, i) => (
            <div
                key={i}
                className="py-4 flex flex-col gap-1.5"
                style={{
                    paddingLeft: i === 0 ? 0 : 16,
                    borderRight: i < 3 ? `1px solid ${FAINT}` : "none",
                }}
            >
                <span className="fs" style={{ fontSize: "1.55rem", fontWeight: 700, color: ACCENT, lineHeight: 1 }}>
                    <CountNum target={s.val} suffix={s.sfx} delay={1.7 + i * 0.12} />
                </span>
                <span className="fm text-[8px] ls2 uppercase" style={{ color: FAINT }}>{s.label}</span>
            </div>
        ))}
    </motion.div>
)
