import { motion, useReducedMotion } from 'framer-motion'
import { RotateCcw, Trophy } from 'lucide-react'
import { getReward } from '../../data/gameConfig'
import styles from './Game.module.css'

export default function GameResult({ result, best, isNewBest, playsLeft, onAgain, onRules }) {
  const reduce = useReducedMotion()
  const reward = getReward(result.score)

  return (
    <motion.div
      className={styles.result}
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.trophy}><Trophy size={30} /></span>
      <p className={styles.resultEyebrow}>Challenge complete</p>

      <p className={styles.scoreLabel}>Final score</p>
      <p className={styles.scoreBig}>
        {result.score}
        {isNewBest && <span className={styles.newBest}>New best!</span>}
      </p>
      <p className={styles.bestLine}>Best this session: {best}</p>

      <div className={styles.rewards}>
        <motion.div
          className={styles.rewardBox}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <strong>+{reward.xp} XP</strong>
          <span>Experience</span>
        </motion.div>
        <motion.div
          className={styles.rewardBox}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <strong>+{reward.ves} VEs</strong>
          <span>Your reward</span>
        </motion.div>
      </div>

      <p className={styles.stats}>
        Caught: {result.orbs} orbs, {result.coins} coins, {result.gems} gems
      </p>
      <p className={styles.note}>Demo reward. Not added to your real balance.</p>

      <div className={styles.actions}>
        {playsLeft > 0 ? (
          <button type="button" className={styles.primary} onClick={onAgain}>
            <RotateCcw size={18} /> Play Again ({playsLeft} left)
          </button>
        ) : (
          <div className={styles.empty}>
            <strong>No plays left today.</strong>
            <span>New challenge coming soon.</span>
          </div>
        )}
        <button type="button" className={styles.secondary} onClick={onRules}>
          Back to rules
        </button>
      </div>
    </motion.div>
  )
}