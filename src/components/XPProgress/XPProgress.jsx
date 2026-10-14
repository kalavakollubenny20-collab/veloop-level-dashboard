import { useEffect, useState } from 'react'
import styles from './XPProgress.module.css'

const R = 70
const C = 2 * Math.PI * R

export default function XPProgress({ currentXP, requiredXP, percent, remaining, nextLevel }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), 150)
    return () => clearTimeout(t)
  }, [percent])

  return (
    <div className={styles.wrap}>
      <div className={styles.ring}>
        <svg
          viewBox="0 0 180 180"
          className={styles.svg}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="XP progress to next level"
        >
          <defs>
            <linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="	
#ffe08a" />
              <stop offset="100%" stopColor="	
#c8921a" />
            </linearGradient>
          </defs>
          <circle cx="90" cy="90" r={R} className={styles.track} />
          <circle
            cx="90" cy="90" r={R}
            className={styles.fill}
            stroke="url(#xpGrad)"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - width / 100)}
            transform="rotate(-90 90 90)"
          />
        </svg>
        <div className={styles.center}>
          <strong>{percent}%</strong>
          <span>complete</span>
        </div>
      </div>

      <p className={styles.xp}>{currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP</p>
      <p className={styles.left}>
        {remaining.toLocaleString()} XP to Level {String(nextLevel).padStart(2, '0')}
      </p>
    </div>
  )
}