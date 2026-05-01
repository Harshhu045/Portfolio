"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

import SectionWrapper from "../components/layout/SectionWrapper"
import LayoutContainer from "../components/layout/LayoutContainer"
import AnimatedHeading from "../components/ui/AnimateHeading"
import RevealOnScroll from "../components/ui/RevealOnScroll"

import FlowNode from "../components/backend/FlowNode"
import FlowConnector from "../components/backend/FlowConnector"
import LatencyWidget from "../components/backend/LatencyWidget"
import TechStackCard from "../components/backend/TechStackCard"

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface NodeData {
    label: string
    sub: string
    tag: string
    metric: string
    metricLabel: string
    accent: string
    dot: string
}

export interface TechCard {
    name: string
    category: string
    desc: string
    stat: string
    statLabel: string
    color: string        // tailwind text color for accent
    border: string       // tailwind border color on hover
    glow: string         // rgba string for box-shadow glow
    icon: string         // SVG path or simple shape identifier
}

// ─── Node Data ─────────────────────────────────────────────────────────────────

export const NODES: NodeData[] = [
    { label: "Frontend", sub: "React + Next.js", tag: "CLIENT", metric: "12ms", metricLabel: "render", accent: "from-blue-500/10", dot: "bg-blue-400" },
    { label: "API Gateway", sub: "Rate limiting · Routing", tag: "EDGE", metric: "3ms", metricLabel: "route", accent: "from-violet-500/10", dot: "bg-violet-400" },
    { label: "Auth Layer", sub: "JWT · OAuth 2.0", tag: "SECURITY", metric: "8ms", metricLabel: "verify", accent: "from-amber-500/10", dot: "bg-amber-400" },
    { label: "Service Layer", sub: "Business logic · Cache", tag: "CORE", metric: "24ms", metricLabel: "process", accent: "from-teal-500/10", dot: "bg-teal-400" },
    { label: "PostgreSQL", sub: "Primary · Read replicas", tag: "DATA", metric: "6ms", metricLabel: "query", accent: "from-emerald-500/10", dot: "bg-emerald-400" },
]

// ─── Flow Node ─────────────────────────────────────────────────────────────────


// ─── Premium Tech Stack ────────────────────────────────────────────────────────
// Each card has: category label, large name, one-line description,
// a live animated stat, and an accent color that bleeds in on hover.

const TECH: TechCard[] = [
    {
        name: "React",
        category: "UI Layer",
        desc: "Component architecture with hooks, context and concurrent rendering",
        stat: "18+",
        statLabel: "projects shipped",
        color: "text-sky-400",
        border: "hover:border-sky-500/40",
        glow: "rgba(56,189,248,0.08)",
        icon: "react",
    },
    {
        name: "Next.js",
        category: "Framework",
        desc: "Full-stack React with SSR, ISR, and Edge runtime support",
        stat: "App Router",
        statLabel: "latest paradigm",
        color: "text-white",
        border: "hover:border-white/30",
        glow: "rgba(255,255,255,0.06)",
        icon: "next",
    },
    {
        name: "Node.js",
        category: "Runtime",
        desc: "Event-driven server-side JS powering high-throughput services",
        stat: "v20 LTS",
        statLabel: "current",
        color: "text-green-400",
        border: "hover:border-green-500/40",
        glow: "rgba(74,222,128,0.07)",
        icon: "node",
    },
    {
        name: "Express",
        category: "HTTP Server",
        desc: "Minimal, unopinionated REST API layer with middleware chains",
        stat: "< 1ms",
        statLabel: "overhead",
        color: "text-neutral-400",
        border: "hover:border-neutral-400/30",
        glow: "rgba(163,163,163,0.06)",
        icon: "express",
    },
    {
        name: "PostgreSQL",
        category: "Database",
        desc: "ACID-compliant relational DB with advanced indexing & JSONB",
        stat: "99.9%",
        statLabel: "uptime SLA",
        color: "text-blue-400",
        border: "hover:border-blue-500/40",
        glow: "rgba(96,165,250,0.08)",
        icon: "pg",
    },
    {
        name: "TypeScript",
        category: "Language",
        desc: "Strongly typed JavaScript for scalable and maintainable backend systems",
        stat: "Type-safe",
        statLabel: "development",
        color: "text-blue-400",
        border: "hover:border-blue-500/40",
        glow: "rgba(96,165,250,0.07)",
        icon: "typescript",
    },
    {
        name: "WebSocket",
        category: "Realtime",
        desc: "Persistent bi-directional communication for real-time apps and streaming",
        stat: "< 50ms",
        statLabel: "latency",
        color: "text-green-400",
        border: "hover:border-green-500/40",
        glow: "rgba(74,222,128,0.07)",
        icon: "websocket",
    },
    {
        name: "System Design",
        category: "Architecture",
        desc: "Scalable distributed systems — queues, CDNs, sharding & CAP tradeoffs",
        stat: "10M+",
        statLabel: "req / day designs",
        color: "text-violet-400",
        border: "hover:border-violet-500/40",
        glow: "rgba(167,139,250,0.08)",
        icon: "sys",
    },
]

export default function BackendSection() {
    const ref = useRef<HTMLDivElement>(null)
    const flowRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    const { scrollYProgress: flowProgress } = useScroll({
        target: flowRef,
        offset: ["start center", "end center"],
    })

    const smooth = useSpring(flowProgress, { stiffness: 100, damping: 28 })

    const [activeNode, setActiveNode] = useState(-1)
    const [activeConnector, setActiveConnector] = useState(-1)

    useEffect(() => {
        return smooth.on("change", (v: number) => {
            const frac = v * (NODES.length - 1)
            const idx = Math.round(frac)

            setActiveNode(Math.max(0, Math.min(NODES.length - 1, idx)))

            const inBetween = frac % 1 > 0.55 && frac % 1 < 0.95
            setActiveConnector(inBetween && Math.floor(frac) < NODES.length - 1 ? Math.floor(frac) : -1)
        })
    }, [smooth])

    return (
        <SectionWrapper id="backend">
            <div ref={ref} className="relative">

                {/* Background */}
                <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-[18vw] font-black text-white/[0.025]">SYSTEM</h1>
                </motion.div>

                <LayoutContainer>
                    <div className="grid md:grid-cols-2 gap-20">

                        {/* LEFT */}
                        <div className="space-y-8 md:sticky md:top-24">
                            <AnimatedHeading>Full Stack<br />Architecture</AnimatedHeading>

                            <RevealOnScroll>
                                <p className="text-white/50 text-lg">
                                    I design systems where frontend, backend, and databases work seamlessly.
                                </p>
                            </RevealOnScroll>

                            <LatencyWidget progress={smooth} activeNode={activeNode} />
                        </div>

                        {/* RIGHT */}
                        <div ref={flowRef}>
                            {NODES.map((node, i) => (
                                <div key={i}>
                                    <FlowNode node={node} isActive={activeNode === i} />
                                    {i < NODES.length - 1 && (
                                        <FlowConnector isActive={activeConnector === i} />
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* TECH STACK */}
                    <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {TECH.map((t, i) => (
                            <TechStackCard key={t.name} tech={t} index={i} />
                        ))}
                    </div>

                </LayoutContainer>

            </div>
        </SectionWrapper>
    )
}