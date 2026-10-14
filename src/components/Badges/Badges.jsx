import { Star, ShieldCheck, Trophy, Plus, Lock } from 'lucide-react'
import Reveal from '../Motion/Reveal'
import styles from './Badges.module.css'

const ICONS = { star: Star, shield: ShieldCheck, trophy: Trophy, plus: Plus }

export default function Badges({ badges, currentLevel }) {
  return (
    <section>
      <h2 className={styles.heading}>Collect Badges</h2>
      <p className={styles.help}>Badges unlock as you reach new levels.</p>

      <div className={styles.grid}>
        {badges.map((b, i) => {
          const Icon = ICONS[b.icon] || Star
          const comingSoon = b.unlockLevel > 50
          const earned = !comingSoon && currentLevel >= b.unlockLevel
          const state = earned ? styles.earned : styles.locked

          return (
            <Reveal key={b.id} delay={i * 0.08} y={24}>
              <article className={`${styles.card} ${state}`}>
                <span className={styles.hex}>
                  <span className={styles.hexInner}>
                    {earned ? <Icon size={26} /> : comingSoon ? <Icon size={26} /> : <Lock size={22} />}
                  </span>
                </span>
                <h3>{b.name}</h3>
                <p>{b.note}</p>
                <span className={styles.status}>
                  {earned ? 'Earned' : comingSoon ? 'Coming Soon' : `Unlocks at Level ${String(b.unlockLevel).padStart(2, '0')}`}
                </span>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}