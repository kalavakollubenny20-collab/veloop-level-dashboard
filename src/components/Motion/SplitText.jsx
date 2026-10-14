import { motion, useReducedMotion } from 'framer-motion'

export default function SplitText({ text, className, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}