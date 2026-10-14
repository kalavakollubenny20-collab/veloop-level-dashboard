// DEMO DATA. Replace with real backend data later.
export const levelData = {
  currentLevel: 4,
  currentXP: 6420,
  requiredXP: 8000,
  nextLevel: 5,
  nextLevelReward: { type: 'VEs', amount: 500 },
}

export const levels = [
  { level: 1, name: 'Starter',    reward: '100 VEs' },
  { level: 2, name: 'Explorer',   reward: '₹10 Cash' },
  { level: 3, name: 'Verified',   reward: '10 Gems' },
  { level: 4, name: 'Top Earner', reward: '₹25 Gift Card' },
  { level: 5, name: 'Achiever',   reward: '500 VEs' },
  { level: 6, name: 'Elite',      reward: '2 Bonus Tokens' },
  { level: 7, name: 'Champion',   reward: '₹25 Gift Card' },
]