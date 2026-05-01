"use client"

import type { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    formRef: React.RefObject<HTMLDivElement>

    rotateX: any
    rotateY: any

    handleFormMouseMove: (e: React.MouseEvent) => void
    handleFormMouseLeave: () => void

    sent: boolean
    setSent: (v: boolean) => void

    name: string
    setName: (v: string) => void

    email: string
    setEmail: (v: string) => void

    message: string
    setMessage: (v: string) => void

    activeIntent: number
    setActiveIntent: (v: number) => void

    handleSubmit: () => void

    hoverCursor: () => void
    leaveCursor: () => void

    INTENTS: string[]
}

const ContactForm: FC<Props> = ({
    formRef,
    rotateX,
    rotateY,
    handleFormMouseMove,
    handleFormMouseLeave,
    sent,
    setSent,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    activeIntent,
    setActiveIntent,
    handleSubmit,
    hoverCursor,
    leaveCursor,
    INTENTS,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-linear-to-b from-violet-500/10 via-transparent to-cyan-500/10 blur-2xl" />

            <motion.div
                ref={formRef}
                onMouseMove={handleFormMouseMove}
                onMouseLeave={handleFormMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            >
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
                </div>

                <div className="relative p-7 sm:p-9" style={{ transform: "translateZ(40px)" }}>
                    <AnimatePresence mode="wait">

                        {!sent ? (
                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">

                                {/* intents */}
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">Project type</span>
                                        <span className="font-mono text-[10px] text-white/25">Select one</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {INTENTS.map((it, i) => (
                                            <button
                                                key={it}
                                                type="button"
                                                onMouseEnter={hoverCursor}
                                                onMouseLeave={leaveCursor}
                                                onClick={() => setActiveIntent(i)}
                                                className="relative"
                                            >
                                                <motion.div
                                                    layout
                                                    className={`relative rounded-full border px-3.5 py-1.5 text-[12.5px] tracking-wide backdrop-blur transition-colors ${activeIntent === i
                                                        ? "border-white/80 bg-white text-black"
                                                        : "border-white/12 bg-white/5 text-white/65 hover:border-white/30 hover:text-white/90"
                                                        }`}
                                                >
                                                    {it}
                                                    {activeIntent === i && (
                                                        <motion.div layoutId="intent-glow" className="absolute -inset-px -z-10 rounded-full bg-white/20 blur-md" />
                                                    )}
                                                </motion.div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* fields */}
                                <div className="space-y-5">

                                    {[
                                        { label: "Your name", id: "name", val: name, set: setName, ph: "Ada Lovelace", type: "text" },
                                        { label: "Email address", id: "email", val: email, set: setEmail, ph: "ada@analytical.engine", type: "email" },
                                    ].map((f) => (
                                        <div key={f.id} className="group relative">
                                            <label className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/35">
                                                {f.label}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type={f.type}
                                                    value={f.val}
                                                    onChange={(e) => f.set(e.target.value)}
                                                    placeholder={f.ph}
                                                    onMouseEnter={hoverCursor}
                                                    onMouseLeave={leaveCursor}
                                                    className="peer w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none backdrop-blur-xl transition-all focus:border-violet-400/50 focus:bg-black/30 focus:ring-4 focus:ring-violet-500/10"
                                                />

                                                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-white/10 transition-opacity peer-focus:opacity-100" />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="group relative">
                                        <label className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/35">
                                            <span>Project details</span>
                                            <span className="font-mono text-white/25">{message.length}/500</span>
                                        </label>

                                        <div className="relative">
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                                                rows={4}
                                                onMouseEnter={hoverCursor}
                                                onMouseLeave={leaveCursor}
                                                className="peer w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none backdrop-blur-xl transition-all focus:border-violet-400/50 focus:bg-black/30 focus:ring-4 focus:ring-violet-500/10"
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* submit */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        onMouseEnter={hoverCursor}
                                        onMouseLeave={leaveCursor}
                                        className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-px"
                                    >
                                        <div className="flex justify-between px-5 py-4">
                                            Send message
                                        </div>
                                    </button>
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div className="text-center py-16">
                                Message sent — thanks!
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ContactForm