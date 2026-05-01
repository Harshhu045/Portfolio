import { useState, type FC } from "react"
import { motion } from "framer-motion"
import type { TechCard } from "../../sections/BackendSection"
import TechIcon from "./TechIcon"



interface TechStackCardProps {
    tech: TechCard
    index: number
}

const TechStackCard: FC<TechStackCardProps> = ({ tech, index }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`group relative rounded-2xl border border-white/[0.07] ${tech.border} 
                        bg-white/2 backdrop-blur-sm p-5 cursor-default overflow-hidden
                        transition-all duration-300 flex flex-col gap-4`}
            style={{
                boxShadow: hovered ? `0 0 40px 0 ${tech.glow}, inset 0 0 0 1px rgba(255,255,255,0.05)` : "none",
            }}
        >
            {/* Glow bleed from top-left corner */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
                transition={{ duration: 0.4 }}
                className="absolute -top-8 -left-8 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ backgroundColor: tech.glow.replace("0.0", "0.3").replace("0.06", "0.3").replace("0.07", "0.3").replace("0.08", "0.3") }}
            />

            {/* Top row — icon + category */}
            <div className="flex items-center justify-between">
                <div className={`${tech.color} transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-50"}`}>
                    <TechIcon id={tech.icon} className="w-5 h-5" />
                </div>
                <span className={`text-[9px] font-mono tracking-[0.18em] uppercase 
                                  transition-colors duration-300
                                  ${hovered ? tech.color : "text-white/20"}`}>
                    {tech.category}
                </span>
            </div>

            {/* Name */}
            <div>
                <h3 className={`text-white font-semibold text-base leading-none tracking-tight
                                transition-colors duration-300
                                ${hovered ? "text-white" : "text-white/75"}`}>
                    {tech.name}
                </h3>
                <p className={`text-xs mt-2 leading-relaxed transition-all duration-300
                               ${hovered ? "text-white/50" : "text-white/20"}`}>
                    {tech.desc}
                </p>
            </div>

            {/* Stat — slides up from hidden on hover */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-auto pt-3 border-t border-white/6"
            >
                <p className={`font-mono font-bold text-sm ${tech.color}`}>{tech.stat}</p>
                <p className="text-white/25 text-[10px] mt-0.5">{tech.statLabel}</p>
            </motion.div>

            {/* Bottom-right corner decoration — diagonal rule */}
            <motion.div
                animate={{ opacity: hovered ? 0.3 : 0, scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 right-4 w-8 h-px bg-white origin-right"
            />
        </motion.div>
    )
}

export default TechStackCard