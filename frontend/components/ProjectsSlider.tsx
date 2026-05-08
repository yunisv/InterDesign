'use client'

import { useState } from 'react'
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
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const next = () => setCurrent((c) => Math.min(c + 1, projects.length - 1))

  return (
    <div>
      {/* Arrows */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Предыдущий"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          disabled={current === projects.length - 1}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Следующий"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slider track */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current} * (min(500px, 80vw) + 16px)))` }}
        >
          {projects.map((project, i) => (
            <div key={i} className="flex-none" style={{ width: 'min(500px, 80vw)' }}>
              <div
                className="relative overflow-hidden rounded-xl bg-white"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={project.image}
                  alt={project.subtitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3">
                <p className="text-gray-400 text-sm">{project.title}</p>
                <p className="text-white font-bold text-base">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
