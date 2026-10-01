import { motion, useReducedMotion } from 'framer-motion'
import { greeting } from '../content/greeting'
import { Sparkles } from './effects/Sparkles'
import './SealedEnvelope.css'

type SealedEnvelopeProps = {
  onOpen: () => void
}

export function SealedEnvelope({ onOpen }: SealedEnvelopeProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="stage seal-stage">
      <Sparkles count={14} />

      <motion.div
        className="seal-content"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="seal-eyebrow body-text">A birthday greeting for</p>
        <h1 className="display seal-name">{greeting.recipientName}</h1>
        <p className="seal-line body-text">{greeting.heroLine}</p>

        <motion.div
          className="envelope"
          animate={
            reduceMotion
              ? undefined
              : {
                  boxShadow: [
                    '0 16px 48px rgba(62, 36, 40, 0.16), 0 0 20px rgba(201, 160, 74, 0.25)',
                    '0 20px 56px rgba(62, 36, 40, 0.2), 0 0 36px rgba(201, 160, 74, 0.45)',
                    '0 16px 48px rgba(62, 36, 40, 0.16), 0 0 20px rgba(201, 160, 74, 0.25)',
                  ],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="envelope-flap" />
          <div className="envelope-body">
            <motion.div
              className="wax-seal"
              animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              <span className="wax-heart" />
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          type="button"
          className="cta"
          onClick={onOpen}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          {greeting.openCta}
        </motion.button>
      </motion.div>
    </section>
  )
}
