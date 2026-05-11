"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { FC } from "react"

import {
    motion,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion"

import { ACCENT, BASE } from "../constant/landing.constants"

export const MagCTA: FC<{ onClick: () => void }> = ({ onClick }) => {

    const ref = useRef<HTMLButtonElement>(null)

    const bx = useMotionValue(0)
    const by = useMotionValue(0)

    const sx = useSpring(bx, { stiffness: 200, damping: 24 })
    const sy = useSpring(by, { stiffness: 200, damping: 24 })

    const [hov, setHov] = useState(false)
    const [clicked, setClicked] = useState(false)

    // ── Track whether we're on a touch/mobile device ──────────────────────────
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // ── Magnetic effect — only on desktop ─────────────────────────────────────
    const onMove = useCallback((e: MouseEvent) => {

        if (window.innerWidth < 768) return

        const r = ref.current?.getBoundingClientRect()
        if (!r) return

        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)

        const dist = Math.hypot(dx, dy)

        if (dist < 130) {
            bx.set(dx * 0.30)
            by.set(dy * 0.30)
        } else {
            bx.set(0)
            by.set(0)
        }

    }, [bx, by])

    useEffect(() => {
        window.addEventListener("mousemove", onMove)
        return () => window.removeEventListener("mousemove", onMove)
    }, [onMove])

    // ── Reset magnet on touch (prevents stuck position on mobile) ─────────────
    useEffect(() => {
        const reset = () => { bx.set(0); by.set(0) }
        window.addEventListener("touchstart", reset, { passive: true })
        return () => window.removeEventListener("touchstart", reset)
    }, [bx, by])

    return (
        <motion.button
            ref={ref}
            data-cursor="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35 }}
            onMouseEnter={() => !isMobile && setHov(true)}
            onMouseLeave={() => {
                setHov(false)
                bx.set(0)
                by.set(0)
            }}
            // Touch feedback for mobile
            onTouchStart={() => setHov(true)}
            onTouchEnd={() => {
                setHov(false)
                setClicked(true)
                onClick()
            }}
            onClick={() => {
                if (isMobile) return   // handled by onTouchEnd
                setClicked(true)
                onClick()
            }}
            className="relative overflow-hidden fs"
            style={{
                fontWeight: 700,
                // Only apply magnetic offset on desktop
                x: isMobile ? 0 : sx,
                y: isMobile ? 0 : sy,
                // Responsive sizing via CSS — no window.innerWidth in render
                fontSize: "clamp(0.78rem, 2.5vw, 0.88rem)",
                letterSpacing: "0.08em",
                padding: "clamp(13px, 3.5vw, 14px) clamp(24px, 6vw, 38px)",
                color: hov || clicked ? BASE : ACCENT,
                background: hov || clicked ? ACCENT : "transparent",
                border: `1px solid ${hov || clicked ? ACCENT : "rgba(232,227,218,0.28)"}`,
                transition: "background 0.28s, color 0.28s, border-color 0.28s",
                whiteSpace: "nowrap",
                // Ensure tap target is large enough on mobile
                minHeight: 44,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
            }}
        >

            {/* Ripple */}
            <AnimatePresence>
                {clicked && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 10, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: BASE, transformOrigin: "center" }}
                    />
                )}
            </AnimatePresence>

            <motion.span
                animate={{ x: hov ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 inline-flex items-center justify-center gap-3"
            >
                <span>Make Your First Move</span>

                <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{ rotate: hov ? -40 : 0 }}
                    transition={{ duration: 0.22 }}
                >
                    <path
                        d="M2 7h10M7 2l5 5-5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </motion.span>

        </motion.button>
    )
}