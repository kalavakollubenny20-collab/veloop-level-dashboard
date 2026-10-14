import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx, y: sy, position: 'fixed', top: 0, left: 0, width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(circle, rgba(167,139,250,0.18), transparent 65%)',
      }}
    />
  )
}