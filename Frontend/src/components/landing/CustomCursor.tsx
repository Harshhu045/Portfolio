"use client"

import { useState, useEffect, useRef } from "react"
import type { FC } from "react"

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion"

import { ACCENT } from "../constant/landing.constants"


interface TrailDot { id: number; x: number; y: number }

export const CustomCursor: FC = () => {
    const mx = useMotionValue(-2000)
    const my = useMotionValue(-2000)
    const sx = useSpring(mx, { stiffness: 500, damping: 40 })
    const sy = useSpring(my, { stiffness: 500, damping: 40 })
    const lx = useSpring(mx, { stiffness: 100, damping: 22 })
    const ly = useSpring(my, { stiffness: 100, damping: 22 })
    const [hovered, setHovered] = useState(false)
    const [trail,   setTrail  ] = useState<TrailDot[]>([])
    const [visible, setVisible] = useState(false)   // hide until first real move
    const counter = useRef(0)

    useEffect(() => {
        let last = { x: -999, y: -999 }

        const move = (e: MouseEvent) => {
            // Only activate on non-touch mouse moves
            if (window.innerWidth < 768) return

            mx.set(e.clientX)
            my.set(e.clientY)
            setVisible(true)

            // Add trail dot only if moved enough
            const dx = e.clientX - last.x
            const dy = e.clientY - last.y
            if (dx * dx + dy * dy > 200) {
                last = { x: e.clientX, y: e.clientY }
                const id = ++counter.current
                setTrail(t => [...t.slice(-10), { id, x: e.clientX, y: e.clientY }])
                setTimeout(() => setTrail(t => t.filter(p => p.id !== id)), 500)
            }
        }

        const over = (e: MouseEvent) => {
            if (window.innerWidth < 768) return
            const el = e.target as HTMLElement
            setHovered(!!el.closest("button,a,[data-cursor]"))
        }

        // Hide cursor when mouse leaves the window
        const leave = () => {
            setVisible(false)
            setTrail([])
            mx.set(-2000)
            my.set(-2000)
        }

        window.addEventListener("mousemove", move)
        window.addEventListener("mouseover", over)
        document.documentElement.addEventListener("mouseleave", leave)

        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseover", over)
            document.documentElement.removeEventListener("mouseleave", leave)
        }
    }, [mx, my])

    // Never render on touch devices at all
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null
    }

    return (
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}>
            {/* Trail dots */}
            {trail.map((p, i) => (
                <div
                    key={p.id}
                    className="fixed pointer-events-none z-[9990] rounded-full"
                    style={{
                        left: p.x - 2, top: p.y - 2,
                        width: 4, height: 4,
                        background: ACCENT,
                        opacity: (i + 1) / trail.length * 0.25,
                        animation: "trailFade 0.5s ease-out forwards",
                    }}
                />
            ))}

            {/* Lag ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                    x: useTransform(lx, v => v - 22),
                    y: useTransform(ly, v => v - 22),
                    width: 44, height: 44,
                    border: `1px solid ${hovered ? ACCENT : "rgba(232,227,218,0.22)"}`,
                    scale: hovered ? 1.5 : 1,
                    transition: "border-color 0.2s, scale 0.25s",
                }}
            />

            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                style={{
                    x: useTransform(sx, v => v - 3),
                    y: useTransform(sy, v => v - 3),
                    width: 6, height: 6,
                    background: ACCENT,
                    scale: hovered ? 0 : 1,
                    transition: "scale 0.2s",
                }}
            />
        </div>
    )
}