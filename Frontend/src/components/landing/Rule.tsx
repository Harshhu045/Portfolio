"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

import { FAINT } from "../constant/landing.constants"

export const Rule: FC<{ label?: string; delay?: number }> = ({ label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.6 }}
        className="flex items-center gap-5"
    >
        <div className="h-px flex-1" style={{ background: FAINT }} />
        {label && (
            <span className="fm text-[8px] ls2 uppercase" style={{ color: FAINT }}>
                {label}
            </span>
        )}
        <div className="h-px w-8" style={{ background: FAINT }} />
    </motion.div>
)