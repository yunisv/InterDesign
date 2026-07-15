'use client'

import { useRef, ReactNode, PointerEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  liftShadow?: string
}

export default function TiltCard({ children, className = '', liftShadow = '0 40px 70px -30px rgba(43,40,35,.5)' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    const max = 8
    el.style.transition = 'transform .08s linear, box-shadow .4s ease'
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.02)`
    el.style.boxShadow = liftShadow
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1), box-shadow .5s ease'
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
