import { motion, useReducedMotion } from 'framer-motion'
import { greeting } from '../content/greeting'
import { PetalField } from './effects/PetalField'
import { Sparkles } from './effects/Sparkles'
import './FlowerBloom.css'

type FlowerBloomProps = {
  onContinue: () => void
}

function Flower({
  className,
  delay = 0,
  id,
}: {
  className?: string
  delay?: number
  id: string
}) {
  const reduceMotion = useReducedMotion()
  const petalId = `${id}-petal`
  const centerId = `${id}-center`

  return (
    <motion.svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden
      initial={reduceMotion ? false : { scale: 0.2, opacity: 0, rotate: -20 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <g transform="translate(60 60)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-22"
            rx="14"
            ry="26"
            fill={`url(#${petalId})`}
            transform={`rotate(${angle})`}
            opacity="0.92"
          />
        ))}
        <circle r="12" fill={`url(#${centerId})`} />
        <circle r="5" fill="#f5e6a8" opacity="0.9" />
      </g>
      <defs>
        <radialGradient id={petalId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f0c4c8" />
          <stop offset="70%" stopColor="#c45c6a" />
          <stop offset="100%" stopColor="#9e3d4a" />
        </radialGradient>
        <radialGradient id={centerId} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="100%" stopColor="#c9a04a" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}

export function FlowerBloom({ onContinue }: FlowerBloomProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="stage bloom-stage">
      <PetalField density="high" burst />
      <Sparkles count={20} />

      <div className="bloom-garden" aria-hidden>
        <Flower id="bloom-left" className="flower flower--side" delay={0.15} />
        <Flower id="bloom-main" className="flower flower--main" delay={0} />
        <Flower id="bloom-right" className="flower flower--side" delay={0.25} />
      </div>

      <motion.div
        className="bloom-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <h2 className="display bloom-title">For {greeting.recipientName}</h2>
        <p className="body-text bloom-line">{greeting.bloomLine}</p>
        <motion.button
          type="button"
          className="cta cta--gold"
          onClick={onContinue}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Open your cards
        </motion.button>
      </motion.div>
    </section>
  )
}
