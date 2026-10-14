import { useState } from 'react'
import styles from './Particles.module.css'

export default function Particles({ count = 16 }) {
  const [dots] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 3 + Math.random() * 5,
      dur: 14 + Math.random() * 14,
      delay: -Math.random() * 20,
      drift: (Math.random() - 0.5) * 80,
    }))
  )

  return (
    <div className={styles.field} aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className={styles.dot}
          style={{
            '--x': `${d.x}%`,
            '--s': `${d.size}px`,
            '--d': `${d.dur}s`,
            '--delay': `${d.delay}s`,
            '--drift': `${d.drift}px`,
          }}
        />
      ))}
    </div>
  )
}