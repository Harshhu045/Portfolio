"use client"

import SectionWrapper from "../components/layout/SectionWrapper"
import LayoutContainer from "../components/layout/LayoutContainer"
import AnimatedHeading from "../components/ui/AnimateHeading"
import RevealOnScroll from "../components/ui/RevealOnScroll"


import ProjectCard from "../components/projects/ProjectCard"
import FeaturedCard from "../components/projects/FeaturedCard"

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Project {
    index: string          // "01", "02", "03"
    title: string
    description: string
    image: string
    tags: string[]
    github: string
    live: string
    year: string
    role: string
    featured?: boolean     // spans full width on desktop
    accent: string         // tailwind color for tag / index tint
    accentRgb: string      // raw rgb for spotlight / glow
}

// ─── Project Data ──────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
    {
        index: "01",
        title: "AutoScribe",
        description:
            "AI-powered content management system that enables users to generate, summarize, and enhance content using NLP-driven features with secure authentication and scalable architecture.",
        image: "/autoscribe.jpg",
        tags: ["React", "TypeScript", "Node.js", "MongoDB", "AI/NLP"],
        github: "https://github.com/Harshhu045/Auto-Scribe",
        live: "#",
        year: "2024",
        role: "Full Stack Development",
        featured: true,
        accent: "text-emerald-400",
        accentRgb: "16, 185, 129",
    },
    {
        index: "02",
        title: "AI Mock Interview Platform",
        description:
            "Voice-based AI interview system that generates role-specific questions, analyzes responses using speech-to-text and NLP, and provides structured feedback on communication and confidence.",
        image: "/project2.jpg",
        tags: ["React", "TypeScript", "Node.js", "MongoDB", "AI", "Speech"],
        github: "https://github.com/Harshhu045/AI-Powered-Mock-Interview",
        live: "#",
        year: "2024",
        role: "Full Stack",
        accent: "text-blue-400",
        accentRgb: "96, 165, 250",
    },
    {
        index: "03",
        title: "Task Manager API",
        description:
            "Production-grade REST API with JWT auth, role-based access control, rate limiting and paginated queries on PostgreSQL.",
        image: "/project3.jpg",
        tags: ["Node", "Express", "PostgreSQL", "Docker"],
        github: "#",
        live: "#",
        year: "2023",
        role: "Backend Engineering",
        accent: "text-emerald-400",
        accentRgb: "52, 211, 153",
    },
]




// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
    const featured = PROJECTS.filter((p) => p.featured)
    const rest = PROJECTS.filter((p) => !p.featured)

    return (
        <SectionWrapper id="projects">

            {/* Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-[18vw] font-black text-white/2.5">WORK</h1>
            </div>

            <LayoutContainer>

                {/* Header */}
                <div className="mb-16">
                    <RevealOnScroll>
                        <AnimatedHeading>Selected Projects</AnimatedHeading>
                    </RevealOnScroll>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-4">

                    {featured.map((p) => (
                        <FeaturedCard key={p.index} project={p} />
                    ))}

                    {rest.map((p, i) => (
                        <ProjectCard key={p.index} project={p} idx={i} />
                    ))}

                </div>

            </LayoutContainer>

        </SectionWrapper>
    )
}