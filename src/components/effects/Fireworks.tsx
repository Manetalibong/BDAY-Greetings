import { useEffect, useRef } from 'react'

type FireworksProps = {
  active: boolean
  density?: 'low' | 'high'
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

type Rocket = {
  x: number
  y: number
  vy: number
  targetY: number
  color: string
  exploded: boolean
}

const COLORS = ['#ff6b8a', '#ffd166', '#fff1c1', '#ff8fab', '#c9a04a', '#ffe0e6', '#ffb703']

export function Fireworks({ active, density = 'high' }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let rockets: Rocket[] = []
    let particles: Particle[] = []
    let lastSpawn = 0
    const spawnEvery = density === 'high' ? 650 : 950

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const explode = (x: number, y: number, color: string) => {
      const count = density === 'high' ? 42 : 28
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2
        const speed = 1.6 + Math.random() * 3.4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 70 + Math.random() * 50,
          color: Math.random() > 0.35 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 1.5 + Math.random() * 2.2,
        })
      }
    }

    const spawnRocket = (w: number, h: number) => {
      rockets.push({
        x: w * (0.12 + Math.random() * 0.76),
        y: h + 8,
        vy: -(6.5 + Math.random() * 3.2),
        targetY: h * (0.15 + Math.random() * 0.35),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
      })
    }

    const tick = (t: number) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      if (t - lastSpawn > spawnEvery) {
        spawnRocket(w, h)
        if (density === 'high') spawnRocket(w, h)
        lastSpawn = t
      }

      rockets = rockets.filter((r) => !r.exploded)
      for (const r of rockets) {
        r.y += r.vy
        r.vy += 0.05
        ctx.beginPath()
        ctx.fillStyle = r.color
        ctx.shadowBlur = 12
        ctx.shadowColor = r.color
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        if (r.y <= r.targetY || r.vy >= -0.5) {
          explode(r.x, r.y, r.color)
          r.exploded = true
        }
      }

      particles = particles.filter((p) => p.life < p.maxLife)
      for (const p of particles) {
        p.life += 1
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.035
        p.vx *= 0.985
        const alpha = 1 - p.life / p.maxLife
        ctx.globalAlpha = Math.max(alpha, 0)
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, density])

  if (!active) return null

  return <canvas ref={canvasRef} className="fireworks-canvas" aria-hidden />
}
