// DEMO VALUES. Real reward rules must be approved by the product team.
export const gameConfig = {
  name: 'XP Catcher',
  duration: 20,        // seconds per round
  playsPerDay: 3,      // demo limit (local only, resets when the page reloads)
  spawnEvery: 0.6,     // seconds between falling items
  items: {
    orb:  { label: 'XP Orb',  points: 10 },
    coin: { label: 'VE Coin', points: 5 },
    gem:  { label: 'Gem',     points: 20 },
  },
  // Highest tier first
  rewardTiers: [
    { min: 150, xp: 30, ves: 12 },
    { min: 100, xp: 20, ves: 8 },
    { min: 50,  xp: 10, ves: 4 },
    { min: 0,   xp: 5,  ves: 0 },
  ],
}

export function getReward(score) {
  return gameConfig.rewardTiers.find((t) => score >= t.min)
}