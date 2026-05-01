"use client"

import type { FC } from "react"
import { motion } from "framer-motion"

interface Props {
    hoverCursor: () => void
    leaveCursor: () => void
}

const ContactLeft: FC<Props> = ({ hoverCursor, leaveCursor }) => {
    return (
        <div className="flex flex-col">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/35">
                    <span className="h-px w-10 bg-linear-to-r from-white/40 to-transparent" />
                    Contact
                </p>

                <h1 className="text-[clamp(44px,7vw,88px)] font-[650] leading-[0.85] tracking-[-0.03em]">
                    Let's build
                    <br />
                    something
                    <br />
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
                            remarkable.
                        </span>

                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -bottom-3 left-0 right-0 h-[1px] origin-left bg-gradient-to-r from-white/60 via-white/20 to-transparent"
                        />
                    </span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-10 flex items-center gap-5"
            >
                <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[12px] tracking-wide text-white/70">
                        Accepting projects Q2
                    </span>
                </div>

                <div className="hidden text-[12px] text-white/30 sm:block">
                    Response time • ~4 hours
                </div>
            </motion.div>

            {/* 3D showcase */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="relative mt-16 hidden lg:block"
            >
                <div className="relative">
                    <div className="relative h-[260px] w-full">
                        {[
                            { t: "React / Next.js", s: "Product engineering", x: 0, y: 0, r: -8 },
                            { t: "Design Systems", s: "Framer Motion", x: 140, y: 40, r: 6 },
                            { t: "TypeScript", s: "Node & Postgres", x: 40, y: 130, r: -4 },
                        ].map((c, i) => (
                            <motion.div
                                key={c.t}
                                className="absolute"
                                style={{ left: c.x, top: c.y }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: [0, -6, 0] }}
                                transition={{
                                    delay: 0.6 + i * 0.1,
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div
                                    className="group relative w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-[1px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                                    style={{ transform: `rotate(${c.r}deg)` }}
                                >
                                    <div className="rounded-2xl bg-[#0a0a0d]/80 p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="h-6 w-6 rounded-lg bg-white/10 ring-1 ring-white/10" />
                                            <div className="text-[10px] uppercase tracking-widest text-white/30">
                                                Featured
                                            </div>
                                        </div>
                                        <div className="text-[15px] font-medium tracking-tight text-white/90">
                                            {c.t}
                                        </div>
                                        <div className="text-[12px] text-white/40">
                                            {c.s}
                                        </div>
                                    </div>

                                    <div
                                        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{
                                            background:
                                                "radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.12), transparent 60%)",
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}

                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
                    </div>
                </div>
            </motion.div>

            {/* socials */}
            <div className="mt-auto pt-14">
                <div className="flex items-center gap-6 border-t border-white/5 pt-6">
                    {[
                        { label: "GitHub", href: "https://github.com/Harshhu045", user: "@Harshhu045" },
                        { label: "LinkedIn", href: "https://linkedin.com", user: "/in/username" },
                        { label: "Email", href: "mailto:upadhyayh886@gmail.com", user: "upadhyayh886@gmail.com" },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            onMouseEnter={hoverCursor}
                            onMouseLeave={leaveCursor}
                            className="group relative"
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-[12px] uppercase tracking-[0.12em] text-white/45 transition-colors group-hover:text-white/80">
                                    {l.label}
                                </span>
                                <span className="text-[11px] text-white/25 transition-colors group-hover:text-white/50">
                                    {l.user}
                                </span>
                            </div>

                            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ContactLeft