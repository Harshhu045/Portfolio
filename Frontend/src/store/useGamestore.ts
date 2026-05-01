import { create } from "zustand"

type Mode =
  | "IDLE"
  | "PROJECTS"
  | "SKILLS"
  | "STACK"
  | "DSA"
  | "SYSTEMS"
  | "CONTACT"

type GameState = {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const useGameStore = create<GameState>((set) => ({
  mode: "IDLE",
  setMode: (mode) => set({ mode }),
}))
