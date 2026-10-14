import { useState } from 'react'
import { Lock, Info, Gift } from 'lucide-react'
import styles from './NextLevelReward.module.css'

export default function NextLevelReward({ reward, nextLevel, percent }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <section className={styles.card}>
      <div className={styles.top}>
        <p className={styles.title}>Next Level Reward</p>
        <button
          className={styles.info}
          aria-label="Reward information"
          aria-expanded={showInfo}
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={18} />
        </button>
      </div>

      {showInfo && (
        <p className={styles.tip}>
          The displayed reward is associated with the next level according to the
          current reward configuration. (Demo value.)
        </p>
      )}

      <div className={styles.gift}>
        <Gift size={44} />
        <Lock size={18} className={styles.lock} />
        <span className={`${styles.coin} ${styles.c1}`} />
        <span className={`${styles.coin} ${styles.c2}`} />
        <span className={`${styles.coin} ${styles.c3}`} />
      </div>

      <p className={styles.amount}>{reward.amount} {reward.type}</p>
      <p className={styles.sub}>Reach Level {String(nextLevel).padStart(2, '0')} to unlock</p>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.pct}>{percent}% there</p>
    </section>
  )
}