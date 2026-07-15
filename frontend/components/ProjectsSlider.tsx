'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  image: string
}

interface ProjectsSliderProps {
  projects: Project[]
}

export default function ProjectsSlider({ projects }: ProjectsSliderProps) {
  const scRef = useRef<HTMLDivElement>(null)

  const amount = () => Math.min(466, (scRef.current?.clientWidth ?? 900) * 0.8)
  const prev = () => scRef.current?.scrollBy({ left: -amount(), behavior: 'smooth' })
  const next = () => scRef.current?.scrollBy({ left: amount(), behavior: 'smooth' })

  return (
    <div>
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-12 h-12 rounded-full border border-foreground/15 flex items-center justify-center text-foreground transition-all duration-300 hover:bg-primary hover:border-primary"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="w-12 h-12 rounded-full border border-foreground/15 flex items-center justify-center text-foreground transition-all duration-300 hover:bg-primary hover:border-primary"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={scRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {projects.map((project, i) => (
          <figure key={i} className="flex-none snap-start m-0" style={{ width: 'min(78vw, 440px)' }}>
            <div
              className="relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-34px_rgba(43,40,35,0.5)]"
              style={{ height: 480 }}
            >
              <Image src={project.image} alt={project.subtitle} fill className="object-cover" />
            </div>
            <figcaption className="pt-5">
              <div className="text-xs tracking-[2px] uppercase text-muted-foreground font-semibold">{project.title}</div>
              <div className="font-serif text-2xl font-semibold text-foreground mt-1 capitalize">{project.subtitle}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
