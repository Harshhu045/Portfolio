import {
  useRef,
  useState,
  useCallback,
  type FC,
  type MouseEvent,
  type CSSProperties,
} from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import type { Project } from "../../sections/ProjectSection"
import CursorSpotlight from "./CursorSpotlight"
import ImageReveal from "./ImageReveal"
import { GithubIcon } from "./Icons"


const FeaturedCard: FC<{ project: Project }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [cursor, setCursor] = useState({ x: 0, y: 0 })

    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const sRotX = useSpring(rotateX, { stiffness: 80, damping: 22 })
    const sRotY = useSpring(rotateY, { stiffness: 80, damping: 22 })

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        const cx = e.clientX - rect.left
        const cy = e.clientY - rect.top
        const px = (cx / rect.width - 0.5) * 2
        const py = (cy / rect.height - 0.5) * 2
        rotateY.set(px * 5)
        rotateX.set(-py * 5)
        setCursor({ x: cx, y: cy })
    }, [rotateX, rotateY])

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
        rotateX.set(0)
        rotateY.set(0)
    }, [rotateX, rotateY])

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 } as CSSProperties}
            className="col-span-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl border border-white/8 bg-white/2
                           backdrop-blur-sm overflow-hidden cursor-none group"
                style={{
                     rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" ,
                    boxShadow: hovered
                        ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(${project.accentRgb},0.15)`
                        : "0 8px 40px rgba(0,0,0,0.3)",
                } as CSSProperties}
            >
                <ImageReveal src={project.image} alt={project.title} hovered={hovered} />
                <CursorSpotlight x={cursor.x} y={cursor.y} visible={hovered} accentRgb={project.accentRgb} />

                {hovered && (
                    <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        className="absolute w-8 h-8 rounded-full border border-white/50 flex items-center justify-center pointer-events-none z-30"
                        style={{ left: cursor.x - 16, top: cursor.y - 16 }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </motion.div>
                )}

                <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-2 gap-8 items-end min-h-65">

                    {/* Left — title block */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className={`font-mono text-xs font-semibold tracking-[0.2em] ${project.accent} opacity-70`}>
                                {project.index}
                            </span>
                            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/25 border border-white/10 rounded-full px-2 py-0.5">
                                Featured
                            </span>
                        </div>
                        <h3 className="text-white font-semibold text-2xl md:text-3xl leading-tight tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                            {project.description}
                        </p>
                    </div>

                    {/* Right — tags + links */}
                    <div className="flex flex-col gap-6 md:items-end">
                        <div className="flex flex-wrap gap-1.5 md:justify-end">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-mono text-white/40 border border-white/8
                                               rounded-full px-2.5 py-0.5 bg-white/3
                                               group-hover:border-white/18 transition-colors duration-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={project.github}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10
                                           bg-white/4 text-white/50 text-xs font-mono
                                           hover:text-white hover:border-white/25 hover:bg-white/8
                                           transition-all duration-200"
                            >
                                <GithubIcon className="w-3.5 h-3.5" />
                                Source
                            </a>
                            {/* <a
                                href={project.live}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border 
                                           bg-white/6 text-white text-xs font-mono
                                           hover:bg-white/12 transition-all duration-200
                                           border-white/15 hover:border-white/30`}
                            >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                Live
                            </a> */}
                        </div>

                        <div className="flex gap-6 border-t border-white/6 pt-4 md:self-stretch md:justify-end">
                            <div className="text-right">
                                <p className="text-white/20 text-[10px] font-mono">{project.role}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/20 text-[10px] font-mono">{project.year}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default FeaturedCard