"use client"

import { useState, useEffect } from "react"
import type { FC } from "react"

import { motion } from "framer-motion"
import { ACCENT, DIM } from "../constant/landing.constants"

export const Mask: FC<{
    text: string; delay: number; dim?: boolean; italic?: boolean; size?: string
}> = ({ text, delay, dim, italic, size = "inherit" }) => (
    <span className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
        <motion.span
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block fs ${italic ? "italic" : ""}`}
            style={{
                color: dim ? DIM : ACCENT,
                fontWeight: 700,
                fontSize: size,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
            }}
        >
            {text}
        </motion.span>
    </span>
)