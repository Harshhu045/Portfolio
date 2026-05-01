"use client"

import { useState, useRef } from "react"
import { useMotionValue, useSpring, useTransform } from "framer-motion"

import ContactLeft from "../components/contact/ContactLeft"
import ContactForm from "../components/contact/ContactForm"
import CoffeeSection from "../components/contact/CoffeeSection"
import CustomCursor from "../components/contact/CustomCursor"
import Background from "../components/contact/BackgroundFX"
import Noise from "../components/contact/Noise"

import { INTENTS, COFFEE_AMOUNTS } from "../components/constant/contact.constants"

export default function ContactSection() {

  // ---------------- STATE ----------------
  const [activeIntent, setActiveIntent] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [coffeeThanks, setCoffeeThanks] = useState(false)

  // ---------------- CURSOR HANDLERS ----------------
  const hoverCursor = () => {
    document.querySelector("[data-cursor]")?.classList.add("expanded")
  }

  const leaveCursor = () => {
    document.querySelector("[data-cursor]")?.classList.remove("expanded")
  }

  // ---------------- FORM 3D ----------------
  const formRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(
  useTransform(y, [-200, 200], [4, -4]),
  { stiffness: 80, damping: 20 }
)

const rotateY = useSpring(
  useTransform(x, [-200, 200], [-4, 4]),
  { stiffness: 80, damping: 20 }
)

  const handleFormMouseMove = (e: React.MouseEvent) => {
    const rect = formRef.current?.getBoundingClientRect()
    if (!rect) return

    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const cx = px - rect.width / 2
    const cy = py - rect.height / 2

    x.set(cx)
    y.set(cy)
  }

  const handleFormMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // ---------------- COFFEE 3D ----------------
  const coffeeX = useMotionValue(0)
  const coffeeY = useMotionValue(0)

  const coffeeRX = useSpring(useTransform(coffeeY, [-50, 50], [10, -10]))
  const coffeeRY = useSpring(useTransform(coffeeX, [-50, 50], [-10, 10]))

  const handleCoffeeMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()

    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    coffeeX.set(px - rect.width / 2)
    coffeeY.set(py - rect.height / 2)
  }

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
  if (!name || !email || !message) return

  try {
    const res = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        intent: INTENTS[activeIntent],
      }),
    })

    if (!res.ok) throw new Error("Failed")

    setSent(true)
  } catch (err) {
    console.error(err)
    alert("Failed to send message")
  }
}

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050507] text-white">

      {/* FX */}
      <Background />
      <Noise />
      <CustomCursor />

      {/* MAIN */}
      <div className="relative z-10 mx-auto max-w-300 px-6 pt-24 pb-10 md:px-10">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <ContactLeft
            hoverCursor={hoverCursor}
            leaveCursor={leaveCursor}
          />

          {/* FORM */}
          <ContactForm
            formRef={formRef}
            rotateX={rotateX}
            rotateY={rotateY}
            handleFormMouseMove={handleFormMouseMove}
            handleFormMouseLeave={handleFormMouseLeave}
            sent={sent}
            setSent={setSent}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
            activeIntent={activeIntent}
            setActiveIntent={setActiveIntent}
            handleSubmit={handleSubmit}
            hoverCursor={hoverCursor}
            leaveCursor={leaveCursor}
            INTENTS={INTENTS}
          />

        </div>

      </div>

      {/* COFFEE */}
      <CoffeeSection
        handleCoffeeMove={handleCoffeeMove}
        coffeeX={coffeeX}
        coffeeY={coffeeY}
        coffeeRX={coffeeRX}
        coffeeRY={coffeeRY}
        COFFEE_AMOUNTS={COFFEE_AMOUNTS}
        hoverCursor={hoverCursor}
        leaveCursor={leaveCursor}
        setCoffeeThanks={setCoffeeThanks}
        coffeeThanks={coffeeThanks}
      />

    </section>
  )
}