import { Users, ClipboardList, Gamepad2, Flame, Zap, ArrowRight } from 'lucide-react'
import styles from './XPActivity.module.css'

const ICONS = { users: Users, tasks: ClipboardList, game: Gamepad2, flame: Flame }

export default function XPActivity({ items, onStart }) {
  const totalXP = items.reduce((sum, i) => sum + i.xp, 0)
  const totalVEs = items.reduce((sum, i) => sum + (i.ves || 0), 0)

  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Recent XP Activity</h2>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}><Zap size={22} /></span>
          <strong>Your XP journey starts here.</strong>
          <button type="button" className={styles.cta} onClick={onStart}>
            Start Earning XP <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((i) => {
              const Icon = ICONS[i.icon] || Zap
              return (
                <li key={i.id} className={styles.row}>
                  <span className={styles.iconBox}><Icon size={18} /></span>
                  <div className={styles.text}>
                    <span className={styles.title}>{i.title}</span>
                    <span className={styles.when}>{i.when}</span>
                  </div>
                  <div className={styles.gain}>
                    <strong>+{i.xp} XP</strong>
                    {i.ves ? <span>+{i.ves} VEs</span> : null}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className={styles.summary}>
            <span>Summary (demo)</span>
            <strong>{totalXP} XP{totalVEs ? ` · ${totalVEs} VEs` : ''}</strong>
          </div>
        </>
      )}
    </section>
  )
}