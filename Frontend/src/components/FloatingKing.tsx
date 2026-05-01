import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

type Props = {
  interactive?: boolean
}

function KingModel({ interactive }: Props) {
  const ref = useRef<THREE.Group>(null!)
  const { scene } = useGLTF("/models/Chess_king.glb")

  const mouse = useRef({ x: 0, y: 0 })

  const [playMove, setPlayMove] = useState(false)
  const [intro, setIntro] = useState(true)

  // intro animation duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntro(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  // mouse tracking
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  // landing button trigger
  useEffect(() => {
    const trigger = () => setPlayMove(true)
    window.addEventListener("king-move", trigger)
    return () => window.removeEventListener("king-move", trigger)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // floating
    ref.current.position.y = Math.sin(t) * 0.15

    // INTRO SPIN
    if (intro) {
      ref.current.rotation.y += 0.25
      ref.current.scale.set(0.01, 0.01, 0.01) // invisible during spin
      return
    } else {
      ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.05)
    }

    if (playMove) {
      ref.current.rotation.y += 0.08
      ref.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.08)
      ref.current.position.z -= 0.05
    }
    else if (interactive) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouse.current.x * 0.6,
        0.08
      )

      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouse.current.y * 0.3,
        0.08
      )
    }
    else {
      ref.current.rotation.y += 0.002
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.2}
      rotation={[0, -Math.PI * 0.45, 0]}
    />
  )
}

export default function FloatingKing({ interactive }: Props) {
  return (
    <div className="fixed right-[-50px] top-[40px] w-[260px] h-[260px] opacity-80 pointer-events-none z-10">
      <div className="absolute inset-0 blur-3xl bg-white/10 rounded-full" />
      <Canvas camera={{ position: [0, 4, 8] }}>
        <spotLight
          position={[0, 5, 3]}
          angle={0.4}
          penumbra={1}
          intensity={2}
        />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 2]} intensity={1.5} />
        <pointLight position={[-2, 2, 3]} intensity={1} />

        <KingModel interactive={interactive} />
      </Canvas>
    </div>
  )
}