import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { greeting } from '../content/greeting'
import { PetalField } from './effects/PetalField'
import './WishCards.css'

type WishCardsProps = {
  onContinue: () => void
}

export function WishCards({ onContinue }: WishCardsProps) {
  const reduceMotion = useReducedMotion()
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})
  const [burstKey, setBurstKey] = useState(0)

  const allFlipped = useMemo(
    () => greeting.cards.every((c) => flipped[c.id]),
    [flipped],
  )

  const flip = (id: string) => {
    setFlipped((prev) => {
      if (prev[id]) return prev
      setBurstKey((k) => k + 1)
      return { ...prev, [id]: true }
    })
  }

  return (
    <section className="stage cards-stage">
      <AnimatePresence>
        {burstKey > 0 && (
          <motion.div
            key={burstKey}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <PetalField density="low" burst />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cards-header"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="display cards-title">Little notes for you</h2>
        <p className="body-text cards-hint">Tap each card to reveal a wish</p>
      </motion.div>

      <div className="cards-grid">
        {greeting.cards.map((card, i) => {
          const isFlipped = !!flipped[card.id]
          return (
            <motion.button
              key={card.id}
              type="button"
              className={`wish-card ${isFlipped ? 'wish-card--flipped' : ''}`}
              onClick={() => flip(card.id)}
              aria-pressed={isFlipped}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={reduceMotion || isFlipped ? undefined : { y: -4 }}
            >
              <div className="wish-card-inner">
                <div className="wish-card-face wish-card-front">
                  <span className="wish-card-ornament" aria-hidden />
                  <span className="display wish-card-label">{card.front}</span>
                  <span className="wish-card-tap">Tap to open</span>
                </div>
                <div className="wish-card-face wish-card-back">
                  <p className="wish-card-message">{card.back}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {allFlipped && (
          <motion.button
            type="button"
            className="cta"
            onClick={onContinue}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            One last wish
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}
