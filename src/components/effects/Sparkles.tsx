import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

type SparklesProps = {
  count?: number
}

export function Sparkles({ count = 16 }: SparklesProps) {
  const reduceMotion = useReducedMotion()

  const sparks = useMemo(() => {
    const n = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
      ? Math.min(count, 10)
      : count
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: 8 + Math.random() * 84,
      top: 8 + Math.random() * 84,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
    }))
  }, [count])

  if (reduceMotion) {
    return (
      <div className="sparkles" aria-hidden>
        {sparks.slice(0, 5).map((s) => (
          <span
            key={s.id}
            className="spark"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="sparkles" aria-hidden>
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="spark"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0.15, 1, 0.15],
            scale: [0.6, 1.35, 0.6],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
