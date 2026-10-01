import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BackgroundMusic } from './components/BackgroundMusic'
import { FinaleWish } from './components/FinaleWish'
import { FlowerBloom } from './components/FlowerBloom'
import { ScriptureBlessings } from './components/ScriptureBlessings'
import { SealedEnvelope } from './components/SealedEnvelope'
import { WishCards } from './components/WishCards'
import './components/effects/effects.css'

export type Stage = 'seal' | 'bloom' | 'scripture' | 'cards' | 'finale'

function App() {
  const [stage, setStage] = useState<Stage>('seal')
  const [musicOn, setMusicOn] = useState(false)

  const openGreeting = () => {
    setMusicOn(true)
    setStage('bloom')
  }

  return (
    <div className="app-shell">
      <BackgroundMusic shouldPlay={musicOn} />

      <AnimatePresence mode="wait">
        {stage === 'seal' && (
          <motion.div
            key="seal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45 }}
          >
            <SealedEnvelope onOpen={openGreeting} />
          </motion.div>
        )}

        {stage === 'bloom' && (
          <motion.div
            key="bloom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <FlowerBloom onContinue={() => setStage('scripture')} />
          </motion.div>
        )}

        {stage === 'scripture' && (
          <motion.div
            key="scripture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ScriptureBlessings onContinue={() => setStage('cards')} />
          </motion.div>
        )}

        {stage === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <WishCards onContinue={() => setStage('finale')} />
          </motion.div>
        )}

        {stage === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <FinaleWish onReplay={() => setStage('seal')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
