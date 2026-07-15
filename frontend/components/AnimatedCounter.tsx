'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ target, className = '' }: { target: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const dur = 1600
            const start = performance.now()
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / dur)
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(target * eased))
              if (p < 1) requestAnimationFrame(step)
              else setValue(target)
            }
            requestAnimationFrame(step)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return (
    <div ref={ref} className={className}>
      {value}
    </div>
  )
}
