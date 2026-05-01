"use client"

import { useEffect, useRef } from "react"
import type { FC } from "react"

import { motion, AnimatePresence } from "framer-motion"

import { ACCENT, BASE } from "../constant/landing.constants"

//
// Phase 1 (0–0.6s)  — The 8×8 board fades in over the landing page.
//                      Each square is either light or dark (checkerboard).
//                      Chess piece glyphs sit on their squares (sparse, authentic).
//
// Phase 2 (0.3–1.1s) — Pieces launch off the board with randomised trajectories,
//                       rotating as they fly. Each piece has a unique delay based
//                       on distance from center — inner pieces fly first.
//
// Phase 3 (0.8–1.5s) — Empty squares flip one by one (rotateY 0→90→0 in the
//                       new color), cascading from center outward, filling the
//                       screen solid dark — board "resets" to blank.
//
// Phase 4 (1.5s)     — onDone fires, portfolio loads under the solid board.

interface ExitOverlayProps { active: boolean; onDone: () => void }

// Sparse piece layout on an 8x8 grid — [row, col, glyph]
// White pieces on bottom rows, black on top — authentic starting positions (partial)
const PIECES: [number, number, string][] = [
    // Black pieces (top)
    [0, 0, "♜"], [0, 2, "♝"], [0, 4, "♛"], [0, 7, "♜"],
    [1, 1, "♟"], [1, 3, "♟"], [1, 5, "♟"], [1, 6, "♟"],
    // White pieces (bottom)
    [6, 0, "♙"], [6, 2, "♙"], [6, 4, "♙"], [6, 7, "♙"],
    [7, 0, "♖"], [7, 3, "♕"], [7, 4, "♔"], [7, 7, "♖"],
    // Mid-game scattered pieces
    [3, 2, "♞"], [3, 5, "♝"], [4, 3, "♟"], [4, 6, "♙"],
    [2, 4, "♜"], [5, 1, "♘"],
]

export const ExitOverlay: FC<ExitOverlayProps> = ({ active, onDone }) => {
    const COLS = 8
    const ROWS = 8
    const TOTAL = COLS * ROWS

    // Pre-compute per-cell random values (stable across renders)
    const cells = useRef(
        Array.from({ length: TOTAL }, (_, idx) => {
            const row = Math.floor(idx / COLS)
            const col = idx % COLS
            const isLight = (row + col) % 2 === 0
            // Distance from center (3.5, 3.5) — drives stagger timing
            const dist = Math.hypot(row - 3.5, col - 3.5)
            // Random launch vector for pieces
            const angle = Math.random() * Math.PI * 2
            const speed = 180 + Math.random() * 260
            return {
                row, col, isLight, dist,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 120, // bias upward
                rot: (Math.random() - 0.5) * 720,
                piece: PIECES.find(([r, c]) => r === row && c === col)?.[2] ?? null,
            }
        })
    ).current

    useEffect(() => {
        if (active) {
            const t = setTimeout(onDone, 1650)
            return () => clearTimeout(t)
        }
    }, [active, onDone])

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="fixed inset-0 z-[9980] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* 8×8 grid fills viewport */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                            gridTemplateRows:    `repeat(${ROWS}, 1fr)`,
                            width: "100vw",
                            height: "100vh",
                        }}
                    >
                        {cells.map((cell, idx) => {
                            // Piece launch delay — center pieces jump first
                            const pieceDelay  = 0.28 + cell.dist * 0.055
                            // Square fill delay — ripples outward from center after pieces leave
                            const squareDelay = 0.75 + cell.dist * 0.068

                            const lightColor = "#dfdfdf"   // warm parchment square
                            const darkColor  = "#0e0e0e"   // deep walnut square
                            const fillColor  = BASE        // final solid black

                            return (
                                <div
                                    key={idx}
                                    style={{ position: "relative", overflow: "hidden" }}
                                >
                                    {/* Board square — fades in immediately */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.18, delay: idx * 0.004 }}
                                        style={{
                                            position: "absolute", inset: 0,
                                            background: cell.isLight ? lightColor : darkColor,
                                        }}
                                    />

                                    {/* Square flip to black — rotateY through 90° then snap */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{
                                            duration: 0.22,
                                            delay: squareDelay,
                                            ease: [0.76, 0, 0.24, 1],
                                        }}
                                        style={{
                                            position: "absolute", inset: 0,
                                            background: fillColor,
                                            transformOrigin: "center",
                                        }}
                                    />

                                    {/* Chess piece — launches off with physics feel */}
                                    {cell.piece && (
                                        <motion.div
                                            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                                            animate={{
                                                x: cell.vx,
                                                y: cell.vy,
                                                rotate: cell.rot,
                                                opacity: 0,
                                                scale: 0.3,
                                            }}
                                            transition={{
                                                duration: 0.65,
                                                delay: pieceDelay,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "clamp(14px, 2.2vw, 22px)",
                                                color: cell.row <= 1 ? darkColor : lightColor,
                                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                                                zIndex: 2,
                                                userSelect: "none",
                                            }}
                                        >
                                            {cell.piece}
                                        </motion.div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* King glyph that zooms in at center last — power move */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.2, 1.4, 3], rotate: [- 15, 0, 5, 0] }}
                        transition={{
                            duration: 0.9,
                            delay: 0.55,
                            times: [0, 0.35, 0.65, 1],
                            ease: "easeOut",
                        }}
                        style={{
                            position: "absolute",
                            top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "clamp(48px, 8vw, 80px)",
                            color: ACCENT,
                            zIndex: 10,
                            filter: `drop-shadow(0 0 30px ${ACCENT}) drop-shadow(0 0 60px rgba(232,227,218,0.4))`,
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    >
                        ♔
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
