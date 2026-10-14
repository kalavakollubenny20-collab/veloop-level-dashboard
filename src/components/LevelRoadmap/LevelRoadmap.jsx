import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Lock, MapPin, Target } from 'lucide-react'
import styles from './LevelRoadmap.module.css'

const LABEL = { completed: 'Completed', current: 'You Are Here', next: 'Next Goal', locked: 'Locked' }
const ICON = {
  completed: <Check size={18} />,
  current: <MapPin size={18} />,
  next: <Target size={18} />,
  locked: <Lock size={16} />,
}
const DETAIL = {
  completed: 'You have completed this level and received its reward.',
  current: 'This is your current level. Keep earning XP to move up.',
  next: 'Your next goal. Earn the remaining XP to unlock it.',
  locked: 'Locked. Reach the earlier levels to unlock it.',
}

export default function LevelRoadmap({ levels, currentLevel }) {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState(currentLevel)

  const getState = (n) =>
    n < currentLevel ? 'completed' : n === currentLevel ? 'current' : n === currentLevel + 1 ? 'next' : 'locked'

  // How far the glowing line fills (up to the current level).
  const fraction = levels.length > 1 ? (currentLevel - 1) / (levels.length - 1) : 0

  return (
    <section>
      <h2 className={styles.heading}>Level Roadmap</h2>
      <p className={styles.help}>Tap a level to see its details.</p>

      <div className={styles.tower}>
        <div className={styles.line} aria-hidden="true">
          <motion.div
            className={styles.lineFill}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: fraction }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className={styles.list}>
          {levels.map((l) => {
            const state = getState(l.level)
            const open = selected === l.level
            return (
              <motion.li
                key={l.level}
                className={`${styles.item} ${styles[state]}`}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (l.level % 7) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.node} aria-hidden="true">{ICON[state]}</span>
                <button
                  type="button"
                  className={styles.card}
                  aria-expanded={open}
                  onClick={() => setSelected(open ? null : l.level)}
                >
                  <span className={styles.tag}>{LABEL[state]}</span>
                  <span className={styles.num}>Level {String(l.level).padStart(2, '0')}</span>
                  <span className={styles.name}>{l.name}</span>
                  <span className={styles.reward}>{l.reward}</span>
                  {open && (
                    <motion.span
                      className={styles.detail}
                      initial={reduce ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {DETAIL[state]}
                    </motion.span>
                  )}
                </button>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}