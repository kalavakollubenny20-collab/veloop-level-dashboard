import styles from './DashboardSkeleton.module.css'

export default function DashboardSkeleton() {
  return (
    <main className="container py-5" aria-busy="true" aria-label="Loading level progress">
      <div className="row g-4">
        <div className="col-12 col-lg-8"><div className={`${styles.block} ${styles.hero}`} /></div>
        <div className="col-12 col-lg-4"><div className={`${styles.block} ${styles.hero}`} /></div>
      </div>
      <div className={`${styles.block} ${styles.wide}`} />
      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-8"><div className={`${styles.block} ${styles.game}`} /></div>
        <div className="col-12 col-lg-4"><div className={`${styles.block} ${styles.game}`} /></div>
      </div>
    </main>
  )
}