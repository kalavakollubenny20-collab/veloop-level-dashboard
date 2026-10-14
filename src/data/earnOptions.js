// status: 'active' = exists on the platform today, 'comingSoon' = concept only
export const earnOptions = [
  { id: 'refer',   icon: 'users',  title: 'Refer & Earn',     text: 'Invite friends and earn up to ₹100 per successful referral.', tag: 'Up to ₹100',      cta: 'Start Referring', status: 'active' },
  { id: 'watch',   icon: 'tv',     title: 'Watch Ads & Earn', text: 'Watch short sponsored ads and earn VE coins.',               tag: 'Up to +1000 VEs', cta: 'Watch Ad',        status: 'active' },
  { id: 'daily',   icon: 'gift',   title: 'Daily Bonus',      text: 'Claim every day to keep your streak alive.',                 tag: 'Daily',           cta: 'Claim Bonus',     status: 'active' },
  { id: 'tap',     icon: 'tap',    title: 'Tap & Earn',       text: 'Tap continuously and earn VEs instantly.',                   tag: 'Unlimited',       cta: 'Start Earning',   status: 'active' },
  { id: 'captcha', icon: 'key',    title: 'Captcha Tasks',    text: 'Solve simple captchas and earn Gems.',                       tag: 'Gems',            cta: 'Start Task',      status: 'active' },
  { id: 'quiz',    icon: 'target', title: 'Quick Quiz',       text: 'Answer a few questions to earn XP.',                         tag: 'Concept',         cta: 'Coming Soon',     status: 'comingSoon' },
  { id: 'weekly',  icon: 'trophy', title: 'Weekly Quest',     text: 'Complete a weekly objective for bonus rewards.',             tag: 'Concept',         cta: 'Coming Soon',     status: 'comingSoon' },
]