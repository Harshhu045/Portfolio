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
import { GithubIcon, ArrowUpRight } from "./Icons"

interface ProjectCardProps {
    project: Project
    idx: number
}

const ProjectCard: FC<ProjectCardProps> = ({ project, idx }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [cursor, setCursor] = useState({ x: 0, y: 0 })

    // Magnetic tilt
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const sRotX = useSpring(rotateX, { stiffness: 120, damping: 20 })
    const sRotY = useSpring(rotateY, { stiffness: 120, damping: 20 })

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        const cx = e.clientX - rect.left
        const cy = e.clientY - rect.top
        const px = (cx / rect.width - 0.5) * 2
        const py = (cy / rect.height - 0.5) * 2
        rotateY.set(px * 8)
        rotateX.set(-py * 8)
        setCursor({ x: cx, y: cy })
    }, [rotateX, rotateY])

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
        rotateX.set(0)
        rotateY.set(0)
    }, [rotateX, rotateY])

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 800 } as CSSProperties}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl border border-white/[0.07] bg-white/2
                           backdrop-blur-sm overflow-hidden cursor-none group
                           transition-all duration-300 hover:border-white/15"
                style={{
                    rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d",
                    boxShadow: hovered
                        ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(${project.accentRgb},0.12)`
                        : "0 4px 24px rgba(0,0,0,0.2)",
                } as CSSProperties}
            >
                {/* Image reveal overlay */}
                <ImageReveal src={project.image} alt={project.title} hovered={hovered} />

                {/* Cursor spotlight */}
                <CursorSpotlight
                    x={cursor.x}
                    y={cursor.y}
                    visible={hovered}
                    accentRgb={project.accentRgb}
                />

                {/* Custom cursor dot */}
                {hovered && (
                    <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        className="absolute w-6 h-6 rounded-full border border-white/60 flex items-center justify-center pointer-events-none z-30"
                        style={{ left: cursor.x - 12, top: cursor.y - 12 }}
                    >
                        <div className="w-1 h-1 rounded-full bg-white" />
                    </motion.div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col gap-6 min-h-80">

                    {/* Top row — index + links */}
                    <div className="flex items-start justify-between">
                        <span
                            className={`font-mono text-xs font-semibold tracking-[0.2em] ${project.accent} opacity-60`}
                        >
                            {project.index}
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                                href={project.github}
                                className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                            {/* <a
                                href={project.live}
                                className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/25 transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a> */}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                        <h3 className="text-white font-semibold text-xl leading-tight tracking-tight mb-3">
                            {project.title}
                        </h3>
                        <p className="text-white/45 text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Bottom — tags + meta */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-mono text-white/40 border border-white/8
                                               rounded-full px-2.5 py-0.5 bg-white/3
                                               group-hover:border-white/15 transition-colors duration-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                            <span className="text-white/25 text-[10px] font-mono">{project.role}</span>
                            <span className="text-white/20 text-[10px] font-mono">{project.year}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ProjectCard