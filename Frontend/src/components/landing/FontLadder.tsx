"use client"
import type { FC } from "react"

const FontLoader: FC = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        *, *::before, *::after { cursor: none !important; box-sizing: border-box; }

        .fs  { font-family: 'Syne', sans-serif; }
        .fm  { font-family: 'DM Mono', monospace; }

        /* Letter spacing helpers */
        .ls1 { letter-spacing: 0.15em; }
        .ls2 { letter-spacing: 0.30em; }
        .ls3 { letter-spacing: 0.50em; }

        /* Blink cursor */
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        .blink { animation: blink 1s step-end infinite; }

        /* Noise reveal overlay */
        @keyframes noiseOut {
            0%   { opacity: 1; filter: url(#noise-filter); }
            80%  { opacity: 0.15; filter: url(#noise-filter); }
            100% { opacity: 0; }
        }
        .noise-exit { animation: noiseOut 0.9s ease-out forwards; }

        /* Horizontal line grow */
        @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        .line-grow { animation: lineGrow 0.8s ease-out forwards; transform-origin: left; }

        /* Cursor trail particle */
        @keyframes trailFade { from{opacity:0.6; transform:scale(1)} to{opacity:0; transform:scale(0.2)} }
    `}</style>
)

export default FontLoader