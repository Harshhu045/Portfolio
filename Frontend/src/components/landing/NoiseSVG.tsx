"use client"
import type { FC } from "react"
const NoiseSVG: FC = () => (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
            <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feComposite in="SourceGraphic" in2="grayNoise" operator="in" />
            </filter>
        </defs>
    </svg>
)
export default NoiseSVG