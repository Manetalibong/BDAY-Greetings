import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { useState } from 'react'
import { greeting } from '../content/greeting'
import { Sparkles } from './effects/Sparkles'
import './ScriptureBlessings.css'

type ScriptureBlessingsProps = {
  onContinue: () => void
}

function quoteVerse(text: string) {
  const cleaned = text.replace(/^[“"]|[”"]$/g, '')
  return `“${cleaned}”`
}

const SWIPE_OFFSET = 80
const SWIPE_VELOCITY = 500

export function ScriptureBlessings({ onContinue }: ScriptureBlessingsProps) {
  const reduceMotion = useReducedMotion()
  const verses = greeting.verses
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<Record<string, boolean>>({})
  const [dragDir, setDragDir] = useState(0)

  const verse = verses[index]
  const isLast = index === verses.length - 1
  const seenCount = Object.keys(seen).length
  const allSeen = seenCount >= verses.length

  const goTo = (next: number) => {
    if (next < 0 || next >= verses.length) return
    setFlipped(false)
    setIndex(next)
  }

  const markSeen = () => {
    setSeen((prev) => ({ ...prev, [verse.id]: true }))
  }

  const flipCard = () => {
    setFlipped((f) => !f)
    markSeen()
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      setDragDir(1)
      goTo(index + 1)
    } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      setDragDir(-1)
      goTo(index - 1)
    }
  }

  return (
    <section className="stage scripture-stage">
      <Sparkles count={10} />

      <motion.div
        className="scripture-header"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="display scripture-title">Blessings for you</h2>
        <p className="body-text scripture-intro">{greeting.scriptureIntro}</p>
      </motion.div>

      <div className="scripture-deck" aria-live="polite">
        <p className="scripture-progress body-text">
          {index + 1} / {verses.length}
        </p>

        <div className="scripture-card-slot">
          <AnimatePresence mode="wait" custom={dragDir}>
            <motion.button
              key={verse.id}
              type="button"
              className={`verse-flip ${flipped ? 'verse-flip--flipped' : ''}`}
              onClick={flipCard}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={onDragEnd}
              custom={dragDir}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: dragDir >= 0 ? 56 : -56, scale: 0.96 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, x: dragDir >= 0 ? -56 : 56, scale: 0.96 }
              }
              transition={{ duration: 0.28 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              aria-pressed={flipped}
              aria-label={
                flipped
                  ? `${verse.reference}. Tap to hide, or swipe for another verse.`
                  : `${verse.reference}. Tap to read, or swipe for another verse.`
              }
            >
              <div className="verse-flip-inner">
                <div className="verse-face verse-face--front">
                  <span className="verse-ornament" aria-hidden />
                  <span className="display verse-ref">{verse.reference}</span>
                  <span className="verse-hint">Tap to reveal</span>
                </div>
                <div className="verse-face verse-face--back">
                  <p className="verse-text">{quoteVerse(verse.text)}</p>
                  <span className="verse-ref-small">{verse.reference}</span>
                </div>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="scripture-dots" role="tablist" aria-label="Verses">
          {verses.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`scripture-dot ${i === index ? 'scripture-dot--active' : ''} ${seen[v.id] ? 'scripture-dot--seen' : ''}`}
              onClick={() => {
                setDragDir(i > index ? 1 : -1)
                goTo(i)
              }}
              aria-label={`Go to ${v.reference}`}
            />
          ))}
        </div>

        <div className="scripture-nav">
          <button
            type="button"
            className="scripture-nav-btn"
            onClick={() => {
              setDragDir(-1)
              goTo(index - 1)
            }}
            disabled={index === 0}
            aria-label="Previous verse"
          >
            Prev
          </button>
          <button
            type="button"
            className="scripture-nav-btn"
            onClick={() => {
              setDragDir(1)
              if (isLast) {
                markSeen()
              }
              goTo(index + 1)
            }}
            disabled={isLast}
            aria-label="Next verse"
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(allSeen || isLast) && (
          <motion.button
            type="button"
            className="cta cta--gold scripture-cta"
            onClick={onContinue}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {greeting.scriptureContinueCta}
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}
