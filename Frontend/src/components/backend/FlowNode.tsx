import type { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { NodeData } from "../../sections/BackendSection"


interface FlowNodeProps {
    node: NodeData
    isActive: boolean
}

const FlowNode: FC<FlowNodeProps> = ({ node, isActive }) => (
    <motion.div
        animate={{
            borderColor: isActive ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.07)",
            boxShadow: isActive ? "0 0 32px 0 rgba(255,255,255,0.05)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className={`relative w-full rounded-xl border px-4 py-3 bg-linear-to-r ${node.accent} to-transparent backdrop-blur-sm overflow-hidden`}
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
        {/* Shimmer sweep */}
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "220%", opacity: [0, 0.1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white to-transparent"
                />
            )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <motion.div
                    animate={{ opacity: isActive ? [1, 0.3, 1] : 0.25 }}
                    transition={{ duration: 1.1, repeat: isActive ? Infinity : 0 }}
                    className={`w-2 h-2 rounded-full shrink-0 ${node.dot}`}
                />
                <div>
                    <p className="text-white font-semibold text-sm leading-tight">{node.label}</p>
                    <p className="text-white/35 text-xs mt-0.5">{node.sub}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.2 }}
                            className="text-right"
                        >
                            <p className="text-white font-mono font-semibold text-sm leading-none">{node.metric}</p>
                            <p className="text-white/35 text-[10px] mt-0.5">{node.metricLabel}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <span className="text-[9px] font-mono text-white/25 border border-white/10 rounded px-1.5 py-0.5 tracking-widest">
                    {node.tag}
                </span>
            </div>
        </div>
    </motion.div>
)

export default FlowNode