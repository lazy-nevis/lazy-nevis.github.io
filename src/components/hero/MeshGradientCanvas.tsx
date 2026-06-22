import { useEffect, useRef } from 'react'

import { useReducedMotion } from '@/hooks/use-ui'

type Blob = {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  color: string
}

const BLOB_COLORS = [
  'rgba(214, 48, 49, 0.35)',
  'rgba(255, 153, 150, 0.25)',
  'rgba(232, 67, 147, 0.2)',
  'rgba(11, 15, 16, 0.9)',
]

function createBlobs(width: number, height: number, count: number): Blob[] {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.min(width, height) * (0.25 + Math.random() * 0.35),
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: BLOB_COLORS[i % BLOB_COLORS.length] ?? BLOB_COLORS[0],
  }))
}

type MeshGradientCanvasProps = {
  className?: string
  blobCount?: number
}

export function MeshGradientCanvas({
  className,
  blobCount = 5,
}: MeshGradientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let blobs: Blob[] = []
    let visible = !document.hidden

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      blobs = createBlobs(rect.width, rect.height, blobCount)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const onVisibility = () => {
      visible = !document.hidden
      if (visible && !reducedMotion) {
        animationId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const draw = (time: number) => {
      if (!visible) return

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const isMobile = w < 768
      const effectiveBlobCount = isMobile ? Math.max(3, blobCount - 2) : blobCount

      if (blobs.length !== effectiveBlobCount) {
        blobs = createBlobs(w, h, effectiveBlobCount)
      }

      ctx.fillStyle = '#0b0f10'
      ctx.fillRect(0, 0, w, h)

      if (reducedMotion) {
        // Static mesh for reduced motion
        for (const blob of blobs) {
          const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
          g.addColorStop(0, blob.color)
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, w, h)
        }
        return
      }

      const parallaxX = (mouseRef.current.x - 0.5) * 40 + scrollRef.current * 0.02
      const parallaxY = (mouseRef.current.y - 0.5) * 40 + scrollRef.current * 0.01
      const t = time * 0.0003

      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i]
        if (!blob) continue

        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < -blob.radius) blob.x = w + blob.radius
        if (blob.x > w + blob.radius) blob.x = -blob.radius
        if (blob.y < -blob.radius) blob.y = h + blob.radius
        if (blob.y > h + blob.radius) blob.y = -blob.radius

        const px = blob.x + Math.sin(t + i) * 20 + parallaxX * (i + 1) * 0.3
        const py = blob.y + Math.cos(t + i * 1.3) * 20 + parallaxY * (i + 1) * 0.3

        const g = ctx.createRadialGradient(px, py, 0, px, py, blob.radius)
        g.addColorStop(0, blob.color)
        g.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, '0.08)'))
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      animationId = requestAnimationFrame(draw)
    }

    if (!reducedMotion) {
      animationId = requestAnimationFrame(draw)
    } else {
      draw(0)
    }

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [blobCount, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}
