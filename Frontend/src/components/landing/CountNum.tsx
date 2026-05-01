"use client"

import { useState, useEffect, useRef } from "react"
import type { FC } from "react"

export const CountNum: FC<{ target: number; suffix?: string; delay: number }> = ({ target, suffix = "", delay }) => {
    const [val, setVal] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const started = useRef(false)

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true
                setTimeout(() => {
                    const dur = 1200
                    const start = performance.now()
                    const tick = (now: number) => {
                        const p = Math.min((now - start) / dur, 1)
                        const eased = 1 - Math.pow(1 - p, 3)
                        setVal(Math.round(eased * target))
                        if (p < 1) requestAnimationFrame(tick)
                    }
                    requestAnimationFrame(tick)
                }, delay * 1000)
            }
        }, { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [target, delay])

    return <span ref={ref}>{val}{suffix}</span>
}