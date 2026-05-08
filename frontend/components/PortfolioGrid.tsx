'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { portfolioApi, PortfolioItem, API_URL } from '@/lib/api'

type Lang = 'ru' | 'en' | 'az'

function getTitle(item: PortfolioItem, lang: Lang) {
  return item[`title_${lang}`] || item.title_ru || item.title_en || item.title_az || '—'
}
function getDesc(item: PortfolioItem, lang: Lang) {
  return item[`desc_${lang}`] || item.desc_ru || item.desc_en || item.desc_az || ''
}

function imgUrl(filename: string) {
  return `${API_URL}/uploads/${filename}`
}

function PortfolioModal({ item, lang, onClose }: { item: PortfolioItem; lang: Lang; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const title = getTitle(item, lang)
  const desc = getDesc(item, lang)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Text */}
        <div className="p-6 pb-4">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg mb-3">
            {item.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">{title}</h2>
          {desc && <p className="text-muted-foreground leading-relaxed">{desc}</p>}
        </div>

        {/* Photos */}
        {item.images.length > 0 && (
          <div className="px-6 pb-6 flex flex-col gap-3">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
              <Image src={imgUrl(item.images[activeImg])} alt={title} fill className="object-cover transition-opacity duration-300" />
            </div>
            {item.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {item.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-none overflow-hidden rounded-lg transition-all ${
                      i === activeImg ? 'ring-2 ring-primary ring-offset-2 opacity-100' : 'opacity-50 hover:opacity-80'
                    }`}
                    style={{ width: 72, height: 52 }}
                  >
                    <Image src={imgUrl(src)} alt={`${title} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const CATEGORY_KEYS = ['Kitchen', 'Bedroom', 'Living', 'Bathroom']

export default function PortfolioGrid() {
  const { lang, t } = useLanguage()
  const p = t.portfolio

  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    portfolioApi.list()
      .then(data => setItems(data.sort((a, b) => a.order - b.order)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filterOptions = [
    { key: 'All', label: p.all },
    { key: 'Kitchen', label: p.kitchen },
    { key: 'Bedroom', label: p.bedroom },
    { key: 'Living', label: p.living },
    { key: 'Bathroom', label: p.bathroom },
  ]

  const filtered = activeFilter === 'All'
    ? items
    : items.filter(item => item.category === activeFilter)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {filterOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeFilter === key
                ? 'bg-primary text-background shadow-lg'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          {p.empty ?? 'Нет проектов'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => {
            const title = getTitle(item, lang as Lang)
            const desc = getDesc(item, lang as Lang)
            const cover = item.images[0] ? imgUrl(item.images[0]) : null

            return (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setActiveItem(item)}
              >
                <div className="relative h-80 overflow-hidden rounded-xl bg-muted">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
                    <h3 className="text-white text-xl font-serif font-bold mb-2">{title}</h3>
                    {desc && <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">{desc}</p>}
                  </div>
                </div>
                <div className="p-4 bg-white border-l-4 border-primary">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-foreground">{title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeItem && (
        <PortfolioModal item={activeItem} lang={lang as Lang} onClose={() => setActiveItem(null)} />
      )}
    </div>
  )
}
