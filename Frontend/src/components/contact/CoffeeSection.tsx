"use client"

import type { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"


interface Props {
    handleCoffeeMove: (e: React.MouseEvent) => void

    coffeeX: any
    coffeeY: any
    coffeeRX: any
    coffeeRY: any

    COFFEE_AMOUNTS: number[]

    hoverCursor: () => void
    leaveCursor: () => void

    setCoffeeThanks: (v: boolean) => void
    coffeeThanks: boolean
}

const CoffeeSection: FC<Props> = ({
    handleCoffeeMove,
    coffeeX,
    coffeeY,
    coffeeRX,
    coffeeRY,
    COFFEE_AMOUNTS,
    hoverCursor,
    leaveCursor,
    setCoffeeThanks,
    coffeeThanks,
}) => {
    return (
        <section className="relative z-10 mt-8 border-t border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
            <div className="mx-auto max-w-300 px-6 py-10 md:px-10 md:py-12">

                <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                        {/* 3D coffee */}
                        <motion.div
                            onMouseMove={handleCoffeeMove}
                            onMouseLeave={() => {
                                coffeeX.set(0)
                                coffeeY.set(0)
                            }}
                            style={{ rotateX: coffeeRX, rotateY: coffeeRY, transformStyle: "preserve-3d" }}
                            className="relative"
                        >
                            <div className="relative grid h-21 w-21 place-items-center">
                                <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-amber-400/20 to-orange-600/20 blur-2xl" />

                                <div
                                    className="relative grid h-21 w-21 place-items-center rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
                                    style={{ transform: "translateZ(20px)" }}
                                >
                                    {/* cup */}
                                    <svg width="44" height="44" viewBox="0 0 64 64" style={{ transform: "translateZ(30px)" }}>
                                        <defs>
                                            <linearGradient id="cup" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
                                            </linearGradient>
                                        </defs>

                                        <path d="M12 20h32l-3 24a6 6 0 0 1-6 5H21a6 6 0 0 1-6-5l-3-24z" fill="url(#cup)" opacity="0.9" />
                                        <path d="M44 24h6a6 6 0 0 1 0 12h-8" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
                                        <ellipse cx="28" cy="19" rx="16" ry="5" fill="white" opacity="0.85" />
                                        <ellipse cx="28" cy="19" rx="12" ry="3.5" fill="#3b1f0b" opacity="0.9" />
                                    </svg>
                                </div>
                            </div>

                            {/* steam */}
                            <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2" style={{ transform: "translateZ(40px)" }}>
                                {[0, 1, 2].map(i => (
                                    <motion.span
                                        key={i}
                                        className="absolute -top-1 h-6 w-0.5 rounded-full bg-linear-to-b from-white/70 to-transparent"
                                        style={{ left: i * 8 - 8 }}
                                        animate={{ y: [-2, -22], opacity: [0.7, 0], scale: [1, 1.2] }}
                                        transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* text */}
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-[22px] font-semibold tracking-tight">Buy me a coffee</h3>
                                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-200/80">
                                    Support
                                </span>
                            </div>

                            <p className="mt-1.5 max-w-[48ch] text-[14px] leading-relaxed text-white/60">
                                I open-source tools, write deep-dives, and ship templates. Your coffee keeps the late-night commits brewing and funds free resources for the community.
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-white/40">
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="h-1 w-1 rounded-full bg-white/30" />
                                    1,247 coffees so far
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                    <span className="h-1 w-1 rounded-full bg-white/30" />
                                    Used for hosting & research
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center justify-start gap-2.5 md:justify-end">
                        {COFFEE_AMOUNTS.map((amt) => (
                            <motion.button
                                key={amt}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onMouseEnter={hoverCursor}
                                onMouseLeave={leaveCursor}
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-order`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ amount: amt }),
                                        })

                                        const order = await res.json()

                                        const options = {
                                            key: import.meta.env.VITE_RAZORPAY_KEY,   // 🔥 replace this
                                            amount: order.amount,
                                            currency: order.currency,
                                            name: "Harsh Portfolio",
                                            description: "Buy me a coffee ☕",
                                            order_id: order.id,
                                            handler: function () {
                                                setCoffeeThanks(true)
                                                setTimeout(() => setCoffeeThanks(false), 2500)
                                            },
                                            theme: {
                                                color: "#f59e0b",
                                            },
                                        }

                                        const rzp = new (window as any).Razorpay(options)
                                        rzp.open()
                                    } catch (err) {
                                        console.error(err)
                                        alert("Payment failed")
                                    }
                                }}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl transition-colors hover:border-amber-400/40 hover:bg-amber-400/10"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-linear-to-b from-amber-300 to-orange-500 text-[14px] font-medium text-black">
                                        ☕
                                    </span>

                                    <div className="text-left">
                                        <div className="text-[13px] font-medium text-white/90">
                                            ${amt}
                                        </div>
                                        <div className="text-[11px] text-white/45">
                                            one time
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}

                        {/* <motion.a
                            whileHover={{ y: -2 }}
                            href="#"
                            onMouseEnter={hoverCursor}
                            onMouseLeave={leaveCursor}
                            className="group relative ml-1 hidden items-center gap-1.5 rounded-2xl border border-white/10 bg-transparent px-3.5 py-3 text-[12.5px] text-white/70 backdrop-blur-xl transition-colors hover:border-white/25 hover:text-white sm:flex"
                        >
                            Custom →
                        </motion.a> */}
                    </div>

                </div>

                <AnimatePresence>
                    {coffeeThanks && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2.5 text-[13px] text-emerald-200/90"
                        >
                            🙌 Thanks for the fuel!
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    )
}

export default CoffeeSection