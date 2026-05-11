"use client"

import { useEffect } from "react"
import type { FC } from "react"

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion"

import { ACCENT, BASE, FAINT, DIM } from "../constant/landing.constants"

import profile from "../../assets/Harsh_AI.jpeg"

export const FilmPhoto: FC<{ exiting: boolean }> = ({ exiting }) => {

    const mx = useMotionValue(0)
    const my = useMotionValue(0)

    const rx = useSpring(
        useTransform(my, [-500, 500], [5, -5]),
        { stiffness: 55, damping: 18 }
    )

    const ry = useSpring(
        useTransform(mx, [-500, 500], [-5, 5]),
        { stiffness: 55, damping: 18 }
    )

    useEffect(() => {

        if (window.innerWidth < 768) return

        const h = (e: MouseEvent) => {
            mx.set(e.clientX - window.innerWidth / 2)
            my.set(e.clientY - window.innerHeight / 2)
        }

        window.addEventListener("mousemove", h)

        return () => window.removeEventListener("mousemove", h)

    }, [mx, my])

    return (
        <motion.div
            animate={
                exiting
                    ? { y: -32, opacity: 0, scale: 0.97 }
                    : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
            }}
        >

            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                }}
                className="relative"
            >

                {/* Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative mx-auto"
                    style={{
                        border: `1px solid ${FAINT}`,
                        padding: "10px 10px 30px 10px",
                        background: "rgba(232,227,218,0.012)",
                        width: "fit-content",
                        maxWidth: "100%",
                    }}
                >

                    {/* Top meta */}
                    <div
                        className="absolute top-2.5 left-3 fm text-[7px] sm:text-[8px] ls1"
                        style={{ color: FAINT }}
                    >
                        ▶ 001
                    </div>

                    <div
                        className="absolute top-2.5 right-3 fm text-[7px] sm:text-[8px] ls1"
                        style={{ color: FAINT }}
                    >
                        2025 ▲
                    </div>

                    {/* Photo */}
                    <motion.div
                        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{
                            duration: 1.1,
                            delay: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden w-[240px] h-[300px] sm:w-[272px] sm:h-[340px]"
                    >

                        <img
                            src={profile}
                            alt="Harsh"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center top",
                                display: "block",
                                filter: "grayscale(15%) contrast(1.08) brightness(0.86)",
                            }}
                        />

                    </motion.div>

                    {/* Bottom strip */}
                    <div
                        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-1.5"
                        style={{ borderTop: `1px solid ${FAINT}` }}
                    >
                        <span
                            className="fm text-[6px] sm:text-[7px] ls2 uppercase"
                            style={{ color: FAINT }}
                        >
                            Harsh Upadhyay
                        </span>

                        <span
                            className="fm text-[6px] sm:text-[7px] ls1"
                            style={{ color: FAINT }}
                        >
                            35mm
                        </span>
                    </div>

                </motion.div>

                {/* Hide chips on small mobile */}
                <div className="hidden sm:block">

                    {/* Available */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute -right-2 top-[30%] translate-x-full"
                        style={{
                            background: BASE,
                            border: `1px solid ${FAINT}`,
                            padding: "9px 13px",
                            minWidth: 118,
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <motion.span
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "#4ade80",
                                    display: "inline-block",
                                }}
                            />

                            <span
                                className="fm text-[7px] ls2 uppercase"
                                style={{ color: FAINT }}
                            >
                                Available
                            </span>
                        </div>

                        <p className="fm text-[9px]" style={{ color: DIM }}>
                            Open to work
                        </p>
                    </motion.div>

                    {/* Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1.75,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute -left-2 bottom-[22%] -translate-x-full"
                        style={{
                            background: BASE,
                            border: `1px solid ${FAINT}`,
                            padding: "9px 13px",
                            minWidth: 128,
                        }}
                    >
                        <p
                            className="fm text-[7px] ls2 uppercase mb-1"
                            style={{ color: FAINT }}
                        >
                            Experience
                        </p>

                        <p className="fm text-[9px]" style={{ color: DIM }}>
                            Prog. Pathshala
                        </p>

                        <p
                            className="fm text-[7px] mt-0.5"
                            style={{ color: FAINT }}
                        >
                            SWE Intern · 2024
                        </p>
                    </motion.div>

                </div>

            </motion.div>
        </motion.div>
    )
}