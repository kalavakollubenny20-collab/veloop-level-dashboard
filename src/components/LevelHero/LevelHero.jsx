import { useState } from 'react'
import { Sparkles, Zap, Target, ArrowUpRight, Info } from 'lucide-react'
import XPProgress from '../XPProgress/XPProgress'
import useCountUp from '../../hooks/useCountUp'
import styles from './LevelHero.module.css'

export default function LevelHero({ data, percent, remaining, levelName }) {
  const pad = (n) => String(n).padStart(2, '0')
  const xp = useCountUp(data.currentXP)
  const [showInfo, setShowInfo] = useState(false)

  return (
    <section className={styles.hero}>
      <div>
        <span className={styles.pill}><Sparkles size={14} /> Level Up Your Rewards</span>

        <div className={styles.levelRow}>
          <div className={styles.badgeWrap} aria-hidden="true">
            <div className={styles.badge}>
              <span className={styles.badgeSmall}>LEVEL</span>
              <span className={styles.badgeNum}>{pad(data.currentLevel)}</span>
            </div>
          </div>
          <div>
            <p className={`${styles.label} ${styles.labelTight}`}>Current Level</p>
            <h1 className={styles.level}>Level {pad(data.currentLevel)}</h1>
            <span className={styles.name}>{levelName}</span>
          </div>
        </div>

        <p className={styles.sub}>
          Keep earning XP, unlock new levels, and discover better rewards along the way.
        </p>

        <button
          type="button"
          className={styles.infoBtn}
          aria-expanded={showInfo}
          aria-label="About XP and levels"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={16} /> How XP works
        </button>
        {showInfo && (
          <p className={styles.infoText}>
            XP helps you progress through VELoop Rewards levels. As you reach new levels, you may
            unlock additional rewards and experiences according to the platform's level system.
          </p>
        )}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <Zap size={16} />
            <span>Current XP</span>
            <strong>{xp.toLocaleString()}</strong>
          </div>
          <div className={styles.stat}>
            <Target size={16} />
            <span>XP Needed</span>
            <strong>{remaining.toLocaleString()}</strong>
          </div>
          <div className={styles.stat}>
            <ArrowUpRight size={16} />
            <span>Next Level</span>
            <strong>{pad(data.nextLevel)}</strong>
          </div>
        </div>
      </div>

      <XPProgress
        currentXP={data.currentXP}
        requiredXP={data.requiredXP}
        percent={percent}
        remaining={remaining}
        nextLevel={data.nextLevel}
      />
    </section>
  )
}