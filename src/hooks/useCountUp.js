import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const from = useRef(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const begin = from.current
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const v = Math.round(begin + (target - begin) * (1 - Math.pow(1 - p, 3)))
      from.current = v
      setValue(v)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}