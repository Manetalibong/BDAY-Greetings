import { useEffect, useRef, useState } from 'react'
import { greeting } from '../content/greeting'
import './BackgroundMusic.css'

type BackgroundMusicProps = {
  /** Start playback (must follow a user gesture for browsers). */
  shouldPlay: boolean
}

export function BackgroundMusic({ shouldPlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const src = greeting.musicSrc.startsWith('http')
      ? greeting.musicSrc
      : `${import.meta.env.BASE_URL}${greeting.musicSrc}`
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'auto'
    audioRef.current = audio

    const onCanPlay = () => setReady(true)
    audio.addEventListener('canplaythrough', onCanPlay)

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.pause()
      audioSrcCleanup(audio)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !shouldPlay) return

    if (enabled) {
      void audio.play().catch(() => {
        setEnabled(false)
      })
    } else {
      audio.pause()
    }
  }, [shouldPlay, enabled, ready])

  if (!shouldPlay) return null

  return (
    <div className="music-control">
      <button
        type="button"
        className={`music-toggle ${enabled ? 'music-toggle--on' : ''}`}
        onClick={() => setEnabled((v) => !v)}
        aria-pressed={enabled}
        aria-label={enabled ? 'Mute music' : 'Play music'}
        title={greeting.musicCredit}
      >
        <span className="music-icon" aria-hidden>
          {enabled ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 5l-5 4H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
              <path d="M16 9a3.5 3.5 0 010 6" />
              <path d="M18.5 7a6 6 0 010 10" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 5l-5 4H3v6h3l5 4V5z" fill="currentColor" stroke="none" opacity="0.45" />
              <path d="M17 9l4 6M21 9l-4 6" />
            </svg>
          )}
        </span>
        <span className="music-label">{enabled ? 'Music' : 'Muted'}</span>
      </button>
    </div>
  )
}

function audioSrcCleanup(audio: HTMLAudioElement) {
  audio.removeAttribute('src')
  audio.load()
}
