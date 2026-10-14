import { Play, Timer, Gamepad2 } from 'lucide-react'
import { gameConfig } from '../../data/gameConfig'
import styles from './Game.module.css'

export default function GameStart({ playsLeft, onStart }) {
  const { items, rewardTiers, duration, playsPerDay, name } = gameConfig
  const tiers = [...rewardTiers].reverse() // lowest first

  const range = (t, i) =>
    i === tiers.length - 1 ? `${t.min}+` : `${t.min}–${tiers[i + 1].min - 1}`

  return (
    <div className={styles.start}>
      <div className={styles.startHead}>
        <span className={styles.gameIcon}><Gamepad2 size={26} /></span>
        <div>
          <h3 className={styles.gameName}>{name}</h3>
          <p className={styles.gameSub}>Catch orbs and coins. Score high for better rewards.</p>
        </div>
      </div>

      <div className={styles.rulesGrid}>
        <div className={styles.rule}>
          <h4>How to play</h4>
          <p>Slide the basket with your mouse, your finger, or the ← → arrow keys.</p>
        </div>
        <div className={styles.rule}>
          <h4>Objective</h4>
          <p>Catch as many falling items as you can before time runs out.</p>
        </div>
        <div className={styles.rule}>
          <h4>Time limit</h4>
          <p><Timer size={14} /> {duration} seconds per round.</p>
        </div>
        <div className={styles.rule}>
          <h4>Score</h4>
          <ul>
            <li>XP Orb: {items.orb.points} points</li>
            <li>VE Coin: {items.coin.points} points</li>
            <li>Gem: {items.gem.points} points</li>
          </ul>
        </div>
        <div className={styles.rule}>
          <h4>Reward (demo)</h4>
          <ul>
            {tiers.map((t, i) => (
              <li key={t.min}>{range(t, i)} points: +{t.xp} XP{t.ves ? `, +${t.ves} VEs` : ''}</li>
            ))}
          </ul>
        </div>
        <div className={styles.rule}>
          <h4>Eligibility &amp; frequency</h4>
          <p>Open to all levels (demo). Up to {playsPerDay} plays per day.</p>
          <p className={styles.left}>{playsLeft} left today</p>
        </div>
      </div>

      <p className={styles.note}>
        This is a prototype. Rewards shown here are demo values and are not added to your real
        balance. This is a skill game with no betting or chance-based prizes. Final rules are set
        by the product team.
      </p>

      {playsLeft > 0 ? (
        <button type="button" className={styles.primary} onClick={onStart}>
          <Play size={18} /> Start Game
        </button>
      ) : (
        <div className={styles.empty}>
          <strong>New challenge coming soon.</strong>
          <span>You've used today's plays. Come back tomorrow.</span>
        </div>
      )}
    </div>
  )
}