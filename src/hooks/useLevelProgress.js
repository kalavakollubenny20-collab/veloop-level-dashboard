import { useState, useEffect } from 'react'
import { levelData } from '../data/levelData'

export default function useLevelProgress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Fake loading. Later, replace this with a real fetch() to the backend.
    const t = setTimeout(() => {
      setData(levelData)
      setLoading(false)
    }, 700)
    return () => clearTimeout(t)
  }, [attempt])

  const retry = () => {
    setLoading(true)
    setError(false)
    setAttempt((a) => a + 1)
  }

  const remaining = data ? data.requiredXP - data.currentXP : 0
  const percent = data ? Math.round((data.currentXP / data.requiredXP) * 100) : 0

  return { data, loading, error, remaining, percent, retry }
}