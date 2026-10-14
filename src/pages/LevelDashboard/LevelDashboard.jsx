import Badges from '../../components/Badges/Badges'
import { badges } from '../../data/badges'
import { useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import useLevelProgress from '../../hooks/useLevelProgress'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { levels } from '../../data/levelData'
import { earnOptions } from '../../data/earnOptions'
import { xpActivity } from '../../data/xpActivity'
import LevelHero from '../../components/LevelHero/LevelHero'
import NextLevelReward from '../../components/NextLevelReward/NextLevelReward'
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap'
import GameContainer from '../../components/PlayAndEarn/GameContainer'
import XPActivity from '../../components/XPActivity/XPActivity'
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP'
import LevelUpModal from '../../components/LevelUpModal/LevelUpModal'
import DashboardSkeleton from '../../components/Skeleton/DashboardSkeleton'
import Reveal from '../../components/Motion/Reveal'
import SplitText from '../../components/Motion/SplitText'
import Tilt from '../../components/Motion/Tilt'
import CursorGlow from '../../components/Motion/CursorGlow'
import Particles from '../../components/Motion/Particles'
import styles from './LevelDashboard.module.css'

export default function LevelDashboard() {
  const { data, loading, error, retry } = useLevelProgress()

  // All hooks stay above the early returns below.
  const [earned, setEarned] = useState({ xp: 0, ves: 0 })
  const [activity, setActivity] = useState(xpActivity)
  const [preview, setPreview] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useSmoothScroll()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -320])

  if (loading) return <DashboardSkeleton />

  if (error) {
    return (
      <div className={styles.state}>
        <h2>Unable to Load Level Progress</h2>
        <p>We couldn't load your level information right now.</p>
        <button className="btn btn-light" onClick={retry}>Try Again</button>
      </div>
    )
  }

  // Live values: demo XP from the game is added on top of the starting XP.
  const liveXP = data.currentXP + earned.xp
  const remaining = Math.max(data.requiredXP - liveXP, 0)
  const percent = Math.min(Math.round((liveXP / data.requiredXP) * 100), 100)
  const heroData = { ...data, currentXP: liveXP }
  const levelName = levels.find((l) => l.level === data.currentLevel)?.name
  const showLevelUp = preview || (liveXP >= data.requiredXP && !dismissed)

  const handleReward = (reward) => {
    setEarned((e) => ({ xp: e.xp + reward.xp, ves: e.ves + reward.ves }))
    setActivity((a) => [
      { id: `g${Date.now()}`, icon: 'game', title: 'XP Catcher Reward', when: 'Just now', xp: reward.xp, ves: reward.ves },
      ...a,
    ])
  }

  const closeLevelUp = () => { setPreview(false); setDismissed(true) }

  const goToGame = () =>
    document.getElementById('play-and-earn')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX }} />
      <motion.div className={styles.orb} style={{ y: orbY }} aria-hidden="true" />
      <CursorGlow />

      <main className={`container py-4 ${styles.page}`}>
        <header className={styles.intro}>
          <p className={styles.kicker}>VELoop Rewards</p>
          <h2 className={styles.title}>
            <SplitText text="Level up your rewards." />
          </h2>
        </header>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <Reveal className="h-100">
              <LevelHero data={heroData} percent={percent} remaining={remaining} levelName={levelName} />
            </Reveal>
          </div>
          <div className="col-12 col-lg-4">
            <Reveal className="h-100" delay={0.15}>
              <Tilt className="h-100">
                <NextLevelReward reward={data.nextLevelReward} nextLevel={data.nextLevel} percent={percent} />
              </Tilt>
            </Reveal>
          </div>
        </div>

        <div className={styles.section}>
          <Reveal>
            <LevelRoadmap levels={levels} currentLevel={data.currentLevel} />
          </Reveal>
        </div>
        <div className={styles.section}>
          <Badges badges={badges} currentLevel={data.currentLevel} />
        </div>

        <div id="play-and-earn" className={`${styles.section} row g-4`}>
          <div className="col-12 col-lg-8">
            <Reveal className="h-100">
              <GameContainer onReward={handleReward} />
            </Reveal>
          </div>
          <div className="col-12 col-lg-4">
            <Reveal className="h-100" delay={0.1}>
              <XPActivity items={activity} onStart={goToGame} />
            </Reveal>
          </div>
        </div>

        <div className={styles.section}>
          <EarnMoreXP options={earnOptions} remaining={remaining} nextLevel={data.nextLevel} />
        </div>

        <div className={styles.previewRow}>
          <button type="button" className={styles.preview} onClick={() => setPreview(true)}>
            Preview level-up celebration (demo)
          </button>
        </div>

        <div className={styles.footerSpace} />
      </main>

      <LevelUpModal
        open={showLevelUp}
        level={data.nextLevel}
        reward={data.nextLevelReward}
        onClose={closeLevelUp}
      />
    </>
  )
}