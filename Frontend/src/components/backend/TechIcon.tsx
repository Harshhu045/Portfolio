import type { FC } from "react"

const TechIcon: FC<{ id: string; className?: string }> = ({ id, className = "w-5 h-5" }) => {
    const icons: Record<string, React.ReactNode> = {
        react: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
        next: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5V7.5l7 9H10.5z" />
            </svg>
        ),
        node: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" />
                <path d="M12 7v10M3 7l9 5 9-5" strokeDasharray="2 1" />
            </svg>
        ),
        express: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <text x="2" y="17" fontSize="11" fontFamily="monospace" fontWeight="700">ex</text>
            </svg>
        ),
        pg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.657 3.134 3 7 3s7-1.343 7-3V6" />
                <path d="M5 12v4c0 1.657 3.134 3 7 3s7-1.343 7-3v-4" />
            </svg>
        ),
        typescript: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 9h8M12 9v8" />
                <path d="M9 17c1.2 1 3.8 1 5 0" />
            </svg>
        ),

        websocket: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <circle cx="12" cy="12" r="2" />
                <path d="M5 12c2-3 12-3 14 0" />
                <path d="M7 15c2-2 8-2 10 0" />
                <path d="M7 9c2 2 8 2 10 0" />
            </svg>
        ),
        sys: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
                <circle cx="5" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="12" cy="19" r="2" />
                <path d="M7 5h10M5 7v10M19 7v4M7 19h3" />
                <circle cx="19" cy="14" r="2" />
                <path d="M19 16v3" />
            </svg>
        ),
    }
    return <>{icons[id] ?? null}</>
}


export default TechIcon