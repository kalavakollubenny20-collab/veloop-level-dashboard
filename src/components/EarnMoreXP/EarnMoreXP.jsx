import { Users, Tv, Gift, MousePointerClick, Keyboard, Target, Trophy, ArrowRight } from 'lucide-react'
import Reveal from '../Motion/Reveal'
import styles from './EarnMoreXP.module.css'

const ICONS = {
  users: Users, tv: Tv, gift: Gift, tap: MousePointerClick,
  key: Keyboard, target: Target, trophy: Trophy,
}

export default function EarnMoreXP({ options, remaining, nextLevel }) {
  return (
    <section>
      <h2 className={styles.heading}>Earn More XP &amp; Rewards</h2>

      <div className={styles.reco}>
        <strong>Recommended for you</strong>
        <span>
          You're {remaining.toLocaleString()} XP away from Level {String(nextLevel).padStart(2, '0')}.
          Complete one more activity to get closer.
        </span>
      </div>

      <div className={styles.grid}>
        {options.map((o, i) => {
          const Icon = ICONS[o.icon] || Gift
          const soon = o.status === 'comingSoon'
          return (
            <Reveal key={o.id} delay={(i % 3) * 0.08} y={30} className={styles.cell}>
              <article className={`${styles.card} ${soon ? styles.soon : ''}`}>
                <div className={styles.head}>
                  <span className={styles.icon}><Icon size={22} /></span>
                  <span className={styles.tag}>{soon ? 'Coming Soon' : o.tag}</span>
                </div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <button type="button" className={styles.btn} disabled={soon}>
                  {o.cta} {!soon && <ArrowRight size={16} />}
                </button>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}