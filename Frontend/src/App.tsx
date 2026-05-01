import { useState, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Landing from "./components/Landing"
import DSASection from "./sections/DSAsection"
import Navbar from "./components/Navbar"
import BackendSection from "./sections/BackendSection"
import ProjectsSection from "./sections/ProjectSection"
import ContactSection from "./sections/ContactSection"
import CursorSpotlight from "./components/CursorSpotlight"
import FloatingKing from "./components/FloatingKing"

export default function App() {
  const [entered, setEntered] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  const dsaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-black text-white overflow-x-hidden">

      <CursorSpotlight/>

      {!entered && <FloatingKing interactive />}

      <AnimatePresence mode="wait">
        {!entered && (  
          <Landing
            key="landing"
            onStart={() => {
              setEntered(true)
              setTimeout(() => {
                dsaRef.current?.scrollIntoView({ behavior: "smooth" })
              }, 100)
            }}
          />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <CursorSpotlight/>
          <Navbar visible={showNavbar} />

          <div ref={dsaRef}>
            <DSASection />
          </div>

          <BackendSection/>
          <ProjectsSection/>
          <ContactSection/>
        </>
      )}
    </div>
  )
}