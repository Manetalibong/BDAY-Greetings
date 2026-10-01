import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { greeting } from '../content/greeting'
import { HugShow } from './HugShow'
import { PetalField } from './effects/PetalField'
import { Sparkles } from './effects/Sparkles'
import './FinaleWish.css'

type FinaleWishProps = {
  onReplay: () => void
}

export function FinaleWish({ onReplay }: FinaleWishProps) {
  const reduceMotion = useReducedMotion()
  const [showHug, setShowHug] = useState(false)

  return (
    <section className="stage finale-stage">
      <PetalField density="medium" />
      <Sparkles count={22} />

      <motion.div
        className="finale-card"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="finale-eyebrow body-text">With all my heart</p>
        <h2 className="display finale-title">
          {greeting.finaleTitle}, {greeting.recipientName}
        </h2>
        <p className="finale-message">{greeting.finaleMessage}</p>

        <blockquote className="finale-verse">
          <p className="finale-verse-text">
            “{greeting.finaleVerse.text.replace(/^[“"]|[”"]$/g, '')}”
          </p>
          <cite className="finale-verse-ref">{greeting.finaleVerse.reference}</cite>
        </blockquote>

        <div className="finale-actions">
          <motion.button
            type="button"
            className="cta"
            onClick={() => setShowHug(true)}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {greeting.hugCta}
          </motion.button>
          <motion.button
            type="button"
            className="cta cta--ghost"
            onClick={onReplay}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {greeting.replayCta}
          </motion.button>
        </div>
      </motion.div>

      <HugShow open={showHug} onClose={() => setShowHug(false)} />
    </section>
  )
}
