import type { FC } from "react"

export const ArrowUpRight: FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const GithubIcon: FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48
    0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46
    -.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83
    .09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94
    0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65
    0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84c.85 0 1.7.11 2.5.33
    1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65
    .64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93
    .36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75
    0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
  </svg>
)