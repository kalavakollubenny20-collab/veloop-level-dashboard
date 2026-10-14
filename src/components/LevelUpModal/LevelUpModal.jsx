import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import styles from './LevelUpModal.module.css'

export default function LevelUpModal({ open, level, reward, onClose }) {
  const reduce = useReducedMotion()
  const btnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    btnRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="levelup-title"
            className={styles.panel}
            initial={reduce ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.eyebrow}>Achievement unlocked</p>
            <h2 id="levelup-title" className={styles.title}>LEVEL UP!</h2>
            <p className={styles.sub}>You've reached</p>

            <div className={styles.stage}>
              <span className={styles.ring} aria-hidden="true" />
              <motion.div
                className={styles.badgeWrap}
                initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.badge}>
                  <span className={styles.badgeSmall}>LEVEL</span>
                  <span className={styles.badgeNum}>{String(level).padStart(2, '0')}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className={styles.reward}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <strong>+{reward.amount} {reward.type}</strong>
              <span>Level reward (demo value)</span>
            </motion.div>

            <button ref={btnRef} type="button" className={styles.btn} onClick={onClose}>
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}