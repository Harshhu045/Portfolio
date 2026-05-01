"use client"

import { useState, useEffect } from "react"
import type { FC } from "react"

import { motion } from "framer-motion"
import { ACCENT } from "../constant/landing.constants"

export const Type: FC<{
    text: string; startDelay: number; speed?: number
    className?: string; style?: React.CSSProperties
}> = ({ text, startDelay, speed = 28, className, style }) => {
    const [n, setN] = useState(0)
    useEffect(() => {
        const t = setTimeout(() => {
            let i = 0
            const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id) }, speed)
            return () => clearInterval(id)
        }, startDelay * 1000)
        return () => clearTimeout(t)
    }, [text, startDelay, speed])
    return (
        <span className={className} style={style}>
            {text.slice(0, n)}
            {n < text.length && <span className="blink" style={{ color: ACCENT, opacity: 0.5 }}>|</span>}
        </span>
    )
}