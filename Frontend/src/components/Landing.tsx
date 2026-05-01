"use client"

import {
    motion
} from "framer-motion"
import {
    useState, useEffect,
    useCallback, type FC,
} from "react"
import FontLoader from "./landing/FontLadder"
import NoiseSVG from "./landing/NoiseSVG"
import Grain from "./landing/Grain"
import { ACCENT, FAINT, DIM, BASE } from "../components/constant/landing.constants"
import { MagCTA } from "./landing/MagCTA"
import { CustomCursor } from "./landing/CustomCursor"
import { FilmPhoto } from "./landing/FilmPhoto"
import { Mask } from "./landing/Mask"
import { Type } from "./landing/Typewriter"
import { Rule } from "./landing/Rule"
import { Lbl } from "./landing/Label"
import { StatsBar } from "./landing/StatsBar"
import { ExitOverlay } from "./landing/ExitOverlay"




interface Props { onStart: () => void }



// ─── Left rail ────────────────────────────────────────────────────────────────
const LeftRail: FC = () => (
    <motion.nav
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5"
    >
        <div className="w-px h-10" style={{ background: FAINT }} />
        {[
            { s: "GH", href: "#" },
            { s: "LI", href: "#" },
            { s: "LC", href: "#" },
            { s: "GFG", href: "#" },
        ].map(({ s, href }) => (
            <a
                key={s} href={href}
                data-cursor="ring"
                className="fm text-[7px] ls3 transition-colors duration-200"
                style={{ color: FAINT, writingMode: "vertical-rl" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
            >
                {s}
            </a>
        ))}
        <div className="w-px h-10" style={{ background: FAINT }} />
    </motion.nav>
)

// ─── Right rail — live clock ──────────────────────────────────────────────────
const RightRail: FC = () => {
    const [t, setT] = useState("")
    useEffect(() => {
        const tick = () => setT(new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: false, timeZone: "Asia/Kolkata",
        }))
        tick(); const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4"
        >
            <div className="w-px h-10" style={{ background: FAINT }} />
            <span className="fm text-[7px] tabular-nums ls1" style={{ color: FAINT, writingMode: "vertical-rl" }}>
                {t} IST
            </span>
            <div className="w-px h-10" style={{ background: FAINT }} />
        </motion.div>
    )
}

// ─── Reversing marquee ────────────────────────────────────────────────────────
const ITEMS = ["React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "OpenAI", "WebSockets", "Docker", "System Design", "REST APIs", "JWT"]

const Marquee: FC = () => {
    const [rev, setRev] = useState(false)
    return (
        <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
            style={{ borderTop: `1px solid ${FAINT}` }}
            onMouseEnter={() => setRev(true)}
            onMouseLeave={() => setRev(false)}
        >
            <motion.div
                animate={{ x: rev ? ["0%", "50%"] : ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="flex gap-7 whitespace-nowrap w-max"
            >
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <span key={i} className="fm text-[8px] ls1" style={{ color: FAINT }}>
                        {item}
                        <span className="ml-7" style={{ color: "rgba(232,227,218,0.05)" }}>·</span>
                    </span>
                ))}
            </motion.div>
        </div>
    )
}


export default function Landing({ onStart }: Props) {
    const [exiting, setExiting] = useState(false)

    const handleStart = useCallback(() => {
        setExiting(true)
    }, [])

    // Called by ExitOverlay after chess board animation completes (~1650ms)
    const handleExitDone = useCallback(() => {
        onStart()
    }, [onStart])

    return (
        <motion.div
            className="fixed inset-0 overflow-hidden flex items-center justify-center"
            style={{ background: BASE }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <NoiseSVG />
            <FontLoader />
            <CustomCursor />
            <Grain />
            <LeftRail />
            <RightRail />

            {/* Exit transition — chess board scatter */}
            <ExitOverlay active={exiting} onDone={handleExitDone} />

            {/* Vignette */}
            <div className="fixed inset-0 pointer-events-none z-[4]"
                style={{
                    background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(7,7,7,0.5) 68%, rgba(7,7,7,0.94) 100%)",
                }} />

            {/* Single ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse 50% 50% at 32% 50%, rgba(232,227,218,0.022) 0%, transparent 100%)",
                }} />

            {/* Corner labels */}
            <Lbl pos="top-7 left-20">Portfolio · 2025</Lbl>
            <Lbl pos="top-7 left-1/2 -translate-x-1/2">Ghaziabad, India</Lbl>
            <Lbl pos="top-7 right-20">upadhyayh886@gmail.com</Lbl>

            {/* Layout */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-20">
                <div className="grid grid-cols-[1fr_auto] gap-16 items-center min-h-screen py-20">

                    {/* LEFT */}
                    <div className="flex flex-col gap-7">

                        {/* Rule */}
                        <Rule label="Full-Stack Engineer · 2025" delay={0.3} />

                        {/* Headline */}
                        <div>
                            <div className="flex gap-[0.2em] flex-wrap">
                                {["I", "build"].map((w, i) => (
                                    <Mask key={w} text={w} delay={0.5 + i * 0.1} size="clamp(3rem, 6.2vw, 5.4rem)" />
                                ))}
                            </div>
                            <div className="flex gap-[0.2em] flex-wrap">
                                {["systems", "that"].map((w, i) => (
                                    <Mask key={w} text={w} delay={0.7 + i * 0.1} dim italic size="clamp(3rem, 6.2vw, 5.4rem)" />
                                ))}
                            </div>
                            <div className="flex gap-[0.2em] flex-wrap items-end">
                                <Mask text="think" delay={0.9} size="clamp(3rem, 6.2vw, 5.4rem)" />
                                <Mask text="ahead." delay={1.0} size="clamp(3rem, 6.2vw, 5.4rem)" />
                                <motion.span
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="fm self-start mt-3"
                                    style={{ fontSize: "0.65rem", color: FAINT, letterSpacing: "0.12em" }}
                                >
                                    ™ 2025
                                </motion.span>
                            </div>
                        </div>

                        {/* Bio */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                            <p className="fm leading-relaxed max-w-[360px]"
                                style={{ fontSize: "0.77rem", color: DIM }}>
                                <Type
                                    text="Hey, I'm Harsh — full-stack engineer. AI systems intern. 350+ DSA. I care about the 100ms between good and great."
                                    startDelay={1.2}
                                    style={{ color: DIM }}
                                />
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <StatsBar />

                        {/* CTA row */}
                        <div className="flex items-center gap-8">
                            <MagCTA onClick={handleStart} />
                            <motion.a
                                href="https://drive.google.com/file/d/1XdVQJZ_ElxKHQ0rlbpAU4E96pyhlbKj7/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="ring"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="fm text-[9px] ls1 uppercase flex items-center gap-2"
                                style={{ color: FAINT }}
                                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                                onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
                            >
                                <motion.svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-3 h-3"
                                    animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                                    transition={{ duration: 1.6, repeat: Infinity }}
                                >
                                    <path
                                        d="M3 13L13 3M13 3H6M13 3v7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </motion.svg>

                                Resume
                            </motion.a>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <FilmPhoto exiting={exiting} />
                </div>
            </div>

            <Marquee />

            {/* Scroll hint */}
            {/* <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <motion.div
                    animate={{ scaleY: [1, 1.6, 1], opacity: [0.15, 0.45, 0.15] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8"
                    style={{ background: `linear-gradient(to bottom, ${ACCENT}, transparent)` }}
                />
                <span className="fm text-[7px] ls3 uppercase" style={{ color: FAINT }}>Scroll</span>
            </motion.div> */}
        </motion.div>
    )
}