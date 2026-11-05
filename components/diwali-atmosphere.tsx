'use client'

import { useEffect, useRef } from 'react'
import { Rocket, Sparkles } from 'lucide-react'

type CelebrationDetail = { x?: number; y?: number }

export function celebrateDiwali(x?: number, y?: number) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<CelebrationDetail>('amba:diwali-celebrate', { detail: { x, y } }))
  }
}

type RocketFlight = { x: number; y: number; targetY: number; hue: number; speed: number }
type Spark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; hue: number; size: number }

export function DiwaliAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasContext = canvas.getContext('2d')
    if (!canvasContext) return
    const context = canvasContext

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')
    const mobile = window.matchMedia('(max-width: 700px)')
    if (reducedMotion.matches) return

    const cursor = cursorRef.current
    const rockets: RocketFlight[] = []
    const sparks: Spark[] = []
    const scheduledCelebrations = new Set<number>()
    const maxSparks = mobile.matches ? 180 : 420
    let width = 0
    let height = 0
    let frame = 0
    let ambientTimer = 0
    let lastFrame = 0
    let disposed = false

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, mobile.matches ? 1 : 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const startFrame = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw)
    }

    const explode = (rocket: RocketFlight) => {
      const count = mobile.matches ? 25 : 55
      for (let index = 0; index < count && sparks.length < maxSparks; index += 1) {
        const angle = (Math.PI * 2 * index) / count + Math.random() * 0.08
        const speed = 1.2 + Math.random() * 3.2
        sparks.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 48 + Math.random() * 28,
          maxLife: 76,
          hue: rocket.hue + Math.random() * 22,
          size: 1 + Math.random() * 1.3,
        })
      }
    }

    const launch = (targetX?: number, targetY?: number) => {
      if (document.hidden || disposed) return
      const x = targetX ?? width * (0.15 + Math.random() * 0.7)
      rockets.push({
        x,
        y: height + 8,
        targetY: targetY ?? height * (0.16 + Math.random() * 0.3),
        hue: [39, 24, 6, 355][Math.floor(Math.random() * 4)],
        speed: 5 + Math.random() * 2,
      })
      startFrame()
    }

    function draw(timestamp: number) {
      if (disposed || document.hidden) {
        frame = 0
        return
      }
      frame = 0
      const delta = Math.min((timestamp - (lastFrame || timestamp)) / 16.67, 2)
      lastFrame = timestamp
      context.clearRect(0, 0, width, height)

      for (let index = rockets.length - 1; index >= 0; index -= 1) {
        const rocket = rockets[index]
        const previousY = rocket.y
        rocket.y -= rocket.speed * delta
        context.beginPath()
        context.moveTo(rocket.x, previousY + 9)
        context.lineTo(rocket.x, rocket.y)
        context.strokeStyle = `hsla(${rocket.hue}, 100%, 74%, .78)`
        context.lineWidth = 2
        context.stroke()
        if (rocket.y <= rocket.targetY) {
          explode(rocket)
          rockets.splice(index, 1)
        }
      }

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index]
        spark.x += spark.vx * delta
        spark.y += spark.vy * delta
        spark.vx *= 0.985
        spark.vy = spark.vy * 0.985 + 0.035 * delta
        spark.life -= delta
        if (spark.life <= 0) {
          sparks.splice(index, 1)
          continue
        }
        context.globalAlpha = Math.min(spark.life / 16, 1) * (spark.life / spark.maxLife)
        context.fillStyle = `hsl(${spark.hue}, 100%, 68%)`
        context.shadowBlur = 12
        context.shadowColor = `hsl(${spark.hue}, 100%, 65%)`
        context.beginPath()
        context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1
      context.shadowBlur = 0
      if (rockets.length || sparks.length) frame = requestAnimationFrame(draw)
      else lastFrame = 0
    }

    const scheduleAmbient = () => {
      if (disposed || document.hidden) return
      ambientTimer = window.setTimeout(() => {
        launch()
        scheduleAmbient()
      }, 8000 + Math.random() * 7000)
    }

    const celebrate = (event: Event) => {
      const { x, y } = (event as CustomEvent<CelebrationDetail>).detail ?? {}
      const centerX = x ?? width * (0.38 + Math.random() * 0.24)
      const centerY = y ?? height * 0.3
      launch(centerX - (mobile.matches ? 18 : 42), centerY + 20)
      let firstTimer = 0
      let secondTimer = 0
      firstTimer = window.setTimeout(() => {
        scheduledCelebrations.delete(firstTimer)
        launch(centerX, centerY - 12)
      }, 160)
      secondTimer = window.setTimeout(() => {
        scheduledCelebrations.delete(secondTimer)
        launch(centerX + (mobile.matches ? 18 : 42), centerY + 6)
      }, 320)
      scheduledCelebrations.add(firstTimer)
      scheduledCelebrations.add(secondTimer)
    }

    const setCursorPosition = (event: MouseEvent) => {
      if (!cursor || !finePointer.matches) return
      cursor.style.visibility = 'visible'
      cursor.style.transform = `translate3d(${event.clientX - 10}px, ${event.clientY - 12}px, 0)`
    }
    const hideCursor = () => {
      if (cursor) cursor.style.visibility = 'hidden'
    }
    const updateCursorHover = (event: Event) => {
      if (!cursor) return
      const target = event.type === 'pointerout' ? (event as PointerEvent).relatedTarget : event.target
      if (target instanceof Element && target.closest('a, button, input, select, textarea, label, [role="button"]')) {
        cursor.classList.add('is-interactive')
      } else {
        cursor.classList.remove('is-interactive')
      }
    }
    const handleVisibilityChange = () => {
      window.clearTimeout(ambientTimer)
      ambientTimer = 0
      if (document.hidden) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        lastFrame = 0
        return
      }
      startFrame()
      scheduleAmbient()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('amba:diwali-celebrate', celebrate)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    scheduleAmbient()

    if (finePointer.matches && cursor) {
      document.body.classList.add('diwali-cursor-active')
      window.addEventListener('mousemove', setCursorPosition)
      window.addEventListener('mouseout', hideCursor)
      document.addEventListener('pointerover', updateCursorHover)
      document.addEventListener('pointerout', updateCursorHover)
    }

    return () => {
      disposed = true
      window.clearTimeout(ambientTimer)
      scheduledCelebrations.forEach(timer => window.clearTimeout(timer))
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('amba:diwali-celebrate', celebrate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('mousemove', setCursorPosition)
      window.removeEventListener('mouseout', hideCursor)
      document.removeEventListener('pointerover', updateCursorHover)
      document.removeEventListener('pointerout', updateCursorHover)
      document.body.classList.remove('diwali-cursor-active')
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="diwali-fireworks" aria-hidden="true" />
      <div ref={cursorRef} className="diwali-cursor" aria-hidden="true">
        <Rocket className="diwali-cursor-rocket" size={21} strokeWidth={2.2} />
        <Sparkles className="diwali-cursor-sparkle" size={21} strokeWidth={2.2} />
      </div>
      <div className="diwali-fairy-lights" aria-hidden="true">
        {Array.from({ length: 17 }, (_, index) => <span key={index} />)}
      </div>
      <div className="diwali-kandils" aria-hidden="true">
        <span className="diwali-kandil diwali-kandil-left"><i /></span>
        <span className="diwali-kandil diwali-kandil-right"><i /></span>
      </div>
    </>
  )
}
