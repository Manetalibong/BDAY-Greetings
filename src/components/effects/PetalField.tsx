import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

type PetalFieldProps = {
  density?: 'low' | 'medium' | 'high'
  burst?: boolean
}

const COLORS = ['#e8a0a8', '#c45c6a', '#f0c4c8', '#d47884', '#e8d5a3']

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 640px)').matches
}

export function PetalField({ density = 'medium', burst = false }: PetalFieldProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const count =
    density === 'low' ? (isMobile ? 8 : 12) : density === 'high' ? (isMobile ? 18 : 28) : isMobile ? 12 : 20

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * (burst ? 0.4 : 8),
        duration: burst ? 1.8 + Math.random() * 1.2 : 10 + Math.random() * 10,
        size: 8 + Math.random() * 14,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        sway: 20 + Math.random() * 40,
      })),
    [count, burst],
  )

  if (reduceMotion) {
    return (
      <div className="petal-field petal-field--static" aria-hidden>
        {petals.slice(0, 6).map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{
              left: `${p.left}%`,
              top: `${15 + (p.id % 5) * 15}%`,
              width: p.size,
              height: p.size * 1.35,
              background: p.color,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="petal-field" aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.35,
            background: p.color,
          }}
          initial={
            burst
              ? { top: '45%', opacity: 0, rotate: p.rotate, x: 0 }
              : { top: '-10%', opacity: 0, rotate: p.rotate, x: 0 }
          }
          animate={
            burst
              ? {
                  top: [`45%`, `${70 + Math.random() * 30}%`],
                  x: [0, (Math.random() - 0.5) * 180],
                  opacity: [0, 1, 0],
                  rotate: [p.rotate, p.rotate + 180],
                }
              : {
                  top: ['-10%', '110%'],
                  x: [0, p.sway, -p.sway * 0.6, 0],
                  opacity: [0, 0.85, 0.85, 0],
                  rotate: [p.rotate, p.rotate + 120, p.rotate + 240],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: burst ? 0 : Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
