import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { greeting } from '../content/greeting'
import { Fireworks } from './effects/Fireworks'
import { PetalField } from './effects/PetalField'
import { Sparkles } from './effects/Sparkles'
import './HugShow.css'

type HugShowProps = {
  open: boolean
  onClose: () => void
}

type Beat = 'tease' | 'enjoy' | 'rose' | 'fireworks'

function BloomingRose({ reduceMotion }: { reduceMotion: boolean | null }) {
  const petals = useMemo(() => [0, 45, 90, 135, 180, 225, 270, 315], [])

  return (
    <div className="rose-stage" aria-hidden>
      <motion.div
        className="rose-glow"
        animate={
          reduceMotion
            ? undefined
            : { scale: [0.85, 1.2, 1], opacity: [0.3, 0.75, 0.45] }
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.svg
        viewBox="0 0 200 220"
        className="rose-svg"
        initial={reduceMotion ? false : { scale: 0.28, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.path
          d="M100 210 C95 170 88 140 100 110"
          fill="none"
          stroke="#5f8a4f"
          strokeWidth="6"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="78"
          cy="150"
          rx="18"
          ry="10"
          fill="#6fa35c"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          style={{ transformOrigin: '78px 150px' }}
        />
        <motion.ellipse
          cx="122"
          cy="160"
          rx="16"
          ry="9"
          fill="#7ab068"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          style={{ transformOrigin: '122px 160px' }}
        />

        <g transform="translate(100 95)">
          {petals.map((angle, i) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <motion.ellipse
                cx="0"
                cy="-28"
                rx="16"
                ry="34"
                fill={i % 2 === 0 ? '#c45c6a' : '#e07a88'}
                style={{ transformOrigin: '0px 0px' }}
                initial={reduceMotion ? false : { scale: 0.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.92 }}
                transition={{
                  delay: 1.8 + i * 0.22,
                  duration: 1.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </g>
          ))}
          <motion.circle
            r="14"
            fill="#c9a04a"
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3.8, duration: 0.8 }}
          />
          <motion.circle
            r="6"
            fill="#fff1c1"
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4.2, duration: 0.7 }}
          />
        </g>
      </motion.svg>

      <motion.p
        className="display rose-caption"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.6, duration: 1 }}
      >
        A rose, blooming for you
      </motion.p>
    </div>
  )
}

export function HugShow({ open, onClose }: HugShowProps) {
  const reduceMotion = useReducedMotion()
  const [beat, setBeat] = useState<Beat>('tease')
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches

  useEffect(() => {
    if (!open) {
      setBeat('tease')
      return
    }

    // Slow cinematic pacing — tease → enjoy → rose bloom → fireworks
    const t = reduceMotion
      ? { enjoy: 1600, rose: 3400, fireworks: 7000 }
      : { enjoy: 3200, rose: 7000, fireworks: 15500 }

    const timers = [
      window.setTimeout(() => setBeat('enjoy'), t.enjoy),
      window.setTimeout(() => setBeat('rose'), t.rose),
      window.setTimeout(() => setBeat('fireworks'), t.fireworks),
    ]

    return () => timers.forEach(clearTimeout)
  }, [open, reduceMotion])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`hug-show hug-show--${beat}`}
          role="dialog"
          aria-modal="true"
          aria-label="Hug show"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Sparkles count={beat === 'fireworks' ? 8 : 16} />
          {(beat === 'rose' || beat === 'fireworks') && (
            <PetalField density={beat === 'rose' ? 'high' : 'medium'} />
          )}
          {beat === 'rose' && <PetalField density="medium" burst />}
          <Fireworks
            active={beat === 'fireworks' && !reduceMotion}
            density={isMobile ? 'low' : 'high'}
          />

          <div className="hug-show-inner">
            <AnimatePresence mode="wait">
              {beat === 'tease' && (
                <motion.p
                  key="tease"
                  className="display hug-line hug-line--tease"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45 }}
                >
                  {greeting.hugTease}
                </motion.p>
              )}

              {beat === 'enjoy' && (
                <motion.p
                  key="enjoy"
                  className="display hug-line hug-line--enjoy"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: [0.85, 1.08, 1] }}
                  exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55 }}
                >
                  {greeting.hugEnjoy}
                </motion.p>
              )}

              {beat === 'rose' && (
                <motion.div
                  key="rose"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45 }}
                >
                  <BloomingRose reduceMotion={reduceMotion} />
                </motion.div>
              )}

              {beat === 'fireworks' && (
                <motion.div
                  key="fireworks"
                  className="hug-finale"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.p
                    className="hug-sky-label"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  >
                    Happy Birthday
                  </motion.p>

                  <motion.h2
                    className="display hug-sky-name"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, scale: 0.4, letterSpacing: '0.55em' }
                    }
                    animate={{
                      opacity: 1,
                      scale: [0.4, 1.1, 1],
                      letterSpacing: ['0.55em', '0.04em'],
                      textShadow: [
                        '0 0 12px rgba(255,209,102,0.35)',
                        '0 0 48px rgba(255,107,138,0.9)',
                        '0 0 28px rgba(255,209,102,0.7)',
                      ],
                    }}
                    transition={{ delay: 2.4, duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {greeting.recipientName}
                  </motion.h2>

                  <motion.button
                    type="button"
                    className="cta cta--ghost hug-close"
                    onClick={onClose}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 6.5, duration: 0.9 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    {greeting.hugCloseCta}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
