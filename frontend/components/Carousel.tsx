'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface CarouselProps {
  children: ReactNode[]
  autoPlay?: boolean
  interval?: number
}

export default function Carousel({ children, autoPlay = true, interval = 5200 }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slides = Array.isArray(children) ? children : [children]
  const n = slides.length

  const go = (i: number) => setCurrent(((i % n) + n) % n)

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!autoPlay) return
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % n), interval)
  }

  useEffect(() => {
    restart()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, interval, autoPlay])

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[22px] shadow-[0_40px_90px_-40px_rgba(43,40,35,0.55)]">
        <div
          className="flex transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="flex-none w-full">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          go(current - 1)
          restart()
        }}
        aria-label="Previous slide"
        className="absolute top-1/2 -left-3 md:-left-7 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-foreground shadow-[0_10px_30px_-8px_rgba(43,40,35,0.4)] flex items-center justify-center text-xl transition-all duration-300 hover:bg-primary hover:scale-105"
      >
        ‹
      </button>
      <button
        onClick={() => {
          go(current + 1)
          restart()
        }}
        aria-label="Next slide"
        className="absolute top-1/2 -right-3 md:-right-7 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-foreground shadow-[0_10px_30px_-8px_rgba(43,40,35,0.4)] flex items-center justify-center text-xl transition-all duration-300 hover:bg-primary hover:scale-105"
      >
        ›
      </button>

      <div className="flex gap-2.5 justify-center mt-7">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              go(i)
              restart()
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-7 bg-primary' : 'w-2.5 bg-foreground/20 hover:bg-foreground/35'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
