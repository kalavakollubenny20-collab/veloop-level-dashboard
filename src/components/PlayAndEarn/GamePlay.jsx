import { useEffect, useRef, useState } from 'react'
import { gameConfig } from '../../data/gameConfig'
import styles from './Game.module.css'

const BASKET_W = 24   // basket width, % of the play area
const CATCH_TOP = 78  // items count as caught between these two heights (%)
const CATCH_BOTTOM = 96

const freshState = () => ({
  items: [], basket: 50, score: 0, orbs: 0, coins: 0, gems: 0, nextId: 0, spawnTimer: 0,
})

export default function GamePlay({ onFinish }) {
  const areaRef = useRef(null)
  const stateRef = useRef(freshState())
  const keysRef = useRef({ left: false, right: false })
  const finishedRef = useRef(false)
  const [frame, setFrame] = useState({
    items: [], basket: 50, score: 0, left: gameConfig.duration,
  })

  useEffect(() => {
    stateRef.current = freshState()
    finishedRef.current = false
    areaRef.current?.focus()

    const half = BASKET_W / 2
    let raf
    let last = performance.now()
    const start = last

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const s = stateRef.current
      const elapsed = (now - start) / 1000

      // keyboard movement
      if (keysRef.current.left) s.basket -= 70 * dt
      if (keysRef.current.right) s.basket += 70 * dt
      s.basket = Math.min(100 - half, Math.max(half, s.basket))

      // spawn a new item
      s.spawnTimer += dt
      if (s.spawnTimer >= gameConfig.spawnEvery) {
        s.spawnTimer = 0
        const r = Math.random()
        s.items.push({
          id: s.nextId++,
          type: r < 0.4 ? 'orb' : r < 0.8 ? 'coin' : 'gem',
          x: 6 + Math.random() * 88,
          y: -6,
          speed: 30 + Math.random() * 16,
        })
      }

      // move items and check catches
      const kept = []
      for (const item of s.items) {
        item.y += item.speed * dt
        const caught =
          item.y >= CATCH_TOP &&
          item.y <= CATCH_BOTTOM &&
          Math.abs(item.x - s.basket) <= half + 2
        if (caught) {
          s.score += gameConfig.items[item.type].points
          s[`${item.type}s`] += 1
        } else if (item.y < 108) {
          kept.push(item)
        }
      }
      s.items = kept

      const left = Math.max(gameConfig.duration - elapsed, 0)
      setFrame({
        items: kept.map((i) => ({ ...i })),
        basket: s.basket,
        score: s.score,
        left,
      })

      if (elapsed >= gameConfig.duration) {
        if (!finishedRef.current) {
          finishedRef.current = true
          onFinish({ score: s.score, orbs: s.orbs, coins: s.coins, gems: s.gems })
        }
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const moveTo = (e) => {
    const rect = areaRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const half = BASKET_W / 2
    stateRef.current.basket = Math.min(100 - half, Math.max(half, x))
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') { keysRef.current.left = true; e.preventDefault() }
    if (e.key === 'ArrowRight' || e.key === 'd') { keysRef.current.right = true; e.preventDefault() }
  }
  const onKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keysRef.current.left = false
    if (e.key === 'ArrowRight' || e.key === 'd') keysRef.current.right = false
  }

  const secondsLeft = Math.ceil(frame.left)

  return (
    <div>
      <div className={styles.hud}>
        <div className={styles.hudItem}><span>Score</span><strong>{frame.score}</strong></div>
        <div className={styles.timeWrap}>
          <div className={styles.timeBar}>
            <div
              className={styles.timeFill}
              style={{ width: `${(frame.left / gameConfig.duration) * 100}%` }}
            />
          </div>
        </div>
        <div className={styles.hudItem}><span>Time</span><strong>{secondsLeft}s</strong></div>
      </div>

      <div
        ref={areaRef}
        className={styles.area}
        tabIndex={0}
        role="application"
        aria-label="XP Catcher play area. Use the left and right arrow keys or move the pointer to slide the basket."
        onPointerMove={moveTo}
        onPointerDown={moveTo}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {frame.items.map((i) => (
          <span
            key={i.id}
            className={`${styles.item} ${styles[i.type]}`}
            style={{ left: `${i.x}%`, top: `${i.y}%` }}
          >
            {i.type === 'orb' ? 'XP' : i.type === 'coin' ? 'V' : ''}
          </span>
        ))}
        <div
          className={styles.basket}
          style={{ left: `${frame.basket}%`, width: `${BASKET_W}%` }}
        />
      </div>

      <p className={styles.hint}>Slide with your mouse, finger, or the ← → keys.</p>
    </div>
  )
}