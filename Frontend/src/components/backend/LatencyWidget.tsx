import { useEffect, useState, type FC } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"
import { NODES } from "../../sections/BackendSection"

interface LatencyWidgetProps {
    progress: MotionValue<number>
    activeNode: number
}

const LatencyWidget: FC<LatencyWidgetProps> = ({ progress, activeNode }) => {
    const totalMs = NODES.reduce((s, n) => s + parseInt(n.metric, 10), 0)
    const displayed = useTransform(progress, [0, 1], [0, totalMs])
    const [val, setVal] = useState<number>(0)
    useEffect(() => displayed.on("change", (v) => setVal(Math.round(v))), [displayed])

    return (
        <div className="border border-white/8 rounded-xl p-4 bg-white/2 backdrop-blur-sm inline-block min-w-50">
            <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-2">Request latency</p>
            <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-mono font-bold text-white tabular-nums">{val}</span>
                <span className="text-white/35 text-sm font-mono">ms</span>
            </div>
            <div className="flex gap-1">
                {NODES.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            backgroundColor: activeNode === i
                                ? "rgba(255,255,255,0.75)"
                                : activeNode > i
                                ? "rgba(255,255,255,0.22)"
                                : "rgba(255,255,255,0.07)",
                            scaleY: activeNode === i ? 1.6 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1 flex-1 rounded-full origin-bottom"
                    />
                ))}
            </div>
        </div>
    )
}

export default LatencyWidget