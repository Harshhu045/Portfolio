"use client"

import type { FC, ReactNode } from "react"
import { motion } from "framer-motion"

import { FAINT } from "../constant/landing.constants"

export const Lbl: FC<{ pos: string; children: ReactNode; delay?: number }> = ({ pos, children, delay = 1.8 }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.7 }}
        className={`absolute ${pos} fm text-[7px] ls2 uppercase z-10`}
        style={{ color: FAINT }}
    >
        {children}
    </motion.div>
)