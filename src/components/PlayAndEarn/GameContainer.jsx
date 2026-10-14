import { useRef, useState } from 'react'
import GameStart from './GameStart'
import GamePlay from './GamePlay'
import GameResult from './GameResult'
import { gameConfig, getReward } from '../../data/gameConfig'
import styles from './Game.module.css'

export default function GameContainer({ onReward }) {
  const [phase, setPhase] = useState('start') // 'start' | 'playing' | 'result'
  const [result, setResult] = useState(null)
  const [playsLeft, setPlaysLeft] = useState(gameConfig.playsPerDay)
  const [best, setBest] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)
  const bestRef = useRef(0)

  const handleStart = () => {
    setPlaysLeft((p) => p - 1)
    setPhase('playing')
  }

  const handleFinish = (r) => {
    const newBest = r.score > bestRef.current
    bestRef.current = Math.max(bestRef.current, r.score)
    setIsNewBest(newBest)
    setBest(bestRef.current)
    onReward?.(getReward(r.score), r.score)
    setResult(r)
    setPhase('result')
  }

  return (
    <section>
      <div className={styles.titleRow}>
        <h2 className={styles.heading}>Play &amp; Earn</h2>
        <span className={styles.demoTag}>Demo values</span>
      </div>
      <p className={styles.help}>A quick skill game while you work towards your next level.</p>

      <div className={styles.shell}>
        {phase === 'start' && <GameStart playsLeft={playsLeft} onStart={handleStart} />}
        {phase === 'playing' && <GamePlay onFinish={handleFinish} />}
        {phase === 'result' && (
          <GameResult
            result={result}
            best={best}
            isNewBest={isNewBest}
            playsLeft={playsLeft}
            onAgain={handleStart}
            onRules={() => setPhase('start')}
          />
        )}
      </div>
    </section>
  )
}