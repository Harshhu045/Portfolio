"use client"

import { useEffect, useState, useRef } from "react"
import SectionWrapper from "../components/layout/SectionWrapper"
import LayoutContainer from "../components/layout/LayoutContainer"
import AnimatedHeading from "../components/ui/AnimateHeading"
import RevealOnScroll from "../components/ui/RevealOnScroll"
import DSAHeatmap from "../components/ui/DSAHeatmap"

import StatCounter from "../components/dsa/StatCounter"
import TopicBar from "../components/dsa/TopicBar"
import JourneyTimeline from "../components/dsa/JourneyTimeline"
import DifficultyDonut from "../components/dsa/DifficultyDonut"
import { motion, useScroll, useTransform } from "framer-motion"

// ─── STATIC TOPICS (kept same) ───────────────────────────────────────────────

const TOPICS = [
    { name: "Arrays & Hashing", solved: 48, total: 55, difficulty: "Easy", color: "bg-emerald-400", accentRgb: "52,211,153" },
    { name: "Two Pointers", solved: 22, total: 25, difficulty: "Easy", color: "bg-emerald-400", accentRgb: "52,211,153" },
    { name: "Sliding Window", solved: 19, total: 22, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Binary Search", solved: 24, total: 28, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Linked Lists", solved: 20, total: 23, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Trees & BST", solved: 38, total: 48, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Graphs", solved: 32, total: 45, difficulty: "Hard", color: "bg-rose-400", accentRgb: "251,113,133" },
    { name: "Dynamic Programming", solved: 41, total: 62, difficulty: "Hard", color: "bg-rose-400", accentRgb: "251,113,133" },
    { name: "Backtracking", solved: 18, total: 25, difficulty: "Hard", color: "bg-rose-400", accentRgb: "251,113,133" },
    { name: "Heaps & Priority Q", solved: 14, total: 20, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Greedy", solved: 16, total: 22, difficulty: "Medium", color: "bg-sky-400", accentRgb: "56,189,248" },
    { name: "Bit Manipulation", solved: 12, total: 18, difficulty: "Hard", color: "bg-rose-400", accentRgb: "251,113,133" },
]

// ─── MAIN ──────────────────────────────────────────────────────────────────────

export default function DSASection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const bgY = useTransform(scrollYProgress, [0, 1], [80, -80])

    const [leetcodeData, setLeetcodeData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/leetcode/harsh_hu")
                const data = await res.json()
                setLeetcodeData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // ✅ Dynamic stats from API
    const dynamicStats = leetcodeData
        ? [
              {
                  value: leetcodeData.totalSolved || 0,
                  suffix: "+",
                  label: "Problems Solved",
                  sublabel: "LeetCode",
                  color: "text-violet-400",
                  accentRgb: "139,92,246",
              },
              {
                  value: leetcodeData.ranking || 0,
                  suffix: "",
                  label: "Global Ranking",
                  sublabel: "LeetCode",
                  color: "text-sky-400",
                  accentRgb: "56,189,248",
              },
              {
              value: 90, // 🔥 manually tracked
              suffix: "d",
              label: "Daily Streak",
              sublabel: "consistent practice",
              color: "text-amber-400",
              accentRgb: "251,191,36",
          },
          {
              value: 68, // ⚡ estimated / manual
              suffix: "%",
              label: "Acceptance Rate",
              sublabel: "submissions success",
              color: "text-emerald-400",
              accentRgb: "52,211,153",
          },
          ]
        : []

    // ✅ Loading state
    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-[50vh]">
                Loading DSA data...
            </div>
        )
    }

    return (
        <SectionWrapper id="dsa">
            <div ref={ref} className="relative">

                {/* BG */}
                <motion.div
                    style={{ y: bgY }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h1 className="text-[20vw] font-black text-white/2.5 select-none tracking-tighter">
                        DSA
                    </h1>
                </motion.div>

                {/* Grid */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <LayoutContainer>

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                        <div className="space-y-3">
                            <motion.p
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-white/20 text-[10px] font-mono uppercase tracking-[0.25em]"
                            >
                                Competitive Programming
                            </motion.p>

                            <AnimatedHeading>
                                Data Structures
                                <br />& Algorithms
                            </AnimatedHeading>
                        </div>

                        <RevealOnScroll>
                            <p className="text-white/35 text-sm leading-relaxed max-w-xs md:text-right">
                                I approach engineering through structured problem solving.
                                Algorithms help me reason about system design, performance,
                                and scalable architecture.
                            </p>
                        </RevealOnScroll>
                    </div>

                    {/* ✅ STATS (dynamic now) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                        {dynamicStats.map((s: any, i: number) => (
                            <StatCounter key={s.label} stat={s} delay={i * 130} />
                        ))}
                    </div>

                    {/* TIMELINE */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-white/[0.07]" />
                            <span className="text-white/15 text-[10px] font-mono uppercase tracking-[0.2em]">
                                Learning Journey
                            </span>
                            <div className="h-px flex-1 bg-white/[0.07]" />
                        </div>
                        <JourneyTimeline />
                    </div>

                    {/* MAIN */}
                    <div className="grid md:grid-cols-[1fr_360px] gap-10">

                        {/* LEFT */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px flex-1 bg-white/[0.07]" />
                                <span className="text-white/15 text-[10px] font-mono uppercase tracking-[0.2em]">
                                    Topic Mastery
                                </span>
                                <div className="h-px flex-1 bg-white/[0.07]" />
                            </div>

                            <div className="space-y-3">
                                {TOPICS.map((t, i) => (
                                    <TopicBar key={t.name} topic={t} index={i} />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-8">

                            {/* ✅ FIXED DONUT */}
                            <div className="rounded-2xl border border-white/[0.07] bg-white/2 p-5 backdrop-blur-sm">
                                <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-5">
                                    Difficulty Breakdown
                                </p>
                                <DifficultyDonut data={leetcodeData} />
                            </div>

                            <div className="rounded-2xl border border-white/[0.07] bg-white/2 p-5 backdrop-blur-sm">
                                <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-4">
                                    Activity Heatmap
                                </p>
                                <DSAHeatmap />
                            </div>

                        </div>
                    </div>

                </LayoutContainer>
            </div>
        </SectionWrapper>
    )
}