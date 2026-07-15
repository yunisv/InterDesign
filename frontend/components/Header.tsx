'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, Language } from '@/locales/translations'

function LangSwitcher({ size = 'md', light = false }: { size?: 'sm' | 'md'; light?: boolean }) {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const base = size === 'sm' ? 'px-2.5 py-1.5 text-sm' : 'px-3 py-1.5 text-sm'
  const btnCls = light
    ? `flex items-center gap-1 ${base} rounded-lg border border-white/40 text-white font-semibold hover:border-white transition-all`
    : `flex items-center gap-1 ${base} rounded-lg border border-muted text-secondary font-semibold hover:border-primary hover:text-primary transition-all`

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className={btnCls}>
        {lang.toUpperCase()}
        <ChevronDown size={size === 'sm' ? 12 : 14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-background border border-muted rounded-lg shadow-lg overflow-hidden z-50 min-w-[76px]">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => { setLang(code as Language); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${lang === code ? 'text-primary bg-primary/5' : 'text-secondary'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 70)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const solid = scrolled || isOpen
  const transparent = isHome && !solid

  const navLinks = [
    { href: '/', label: t.header.home },
    { href: '/portfolio', label: t.header.portfolio },
    { href: '/about', label: t.header.about },
    { href: '/faq', label: t.header.faq },
    { href: '/contact', label: t.header.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent py-5'
          : 'bg-background/90 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(43,40,35,.35)] py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-serif font-bold text-lg">
              ID
            </div>
            <span className={`hidden sm:block text-xl font-serif font-semibold transition-colors duration-500 ${transparent ? 'text-white' : 'text-foreground'}`}>
              Interior Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-500 group ${transparent ? 'text-white' : 'text-foreground hover:text-primary'}`}
              >
                {link.label}
                <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Desktop: lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher light={transparent} />
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-primary text-secondary rounded-full font-semibold text-sm transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(201,143,60,.8)]"
            >
              {t.header.getQuote}
            </Link>
          </div>

          {/* Mobile: lang switcher + burger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher size="sm" light={transparent} />
            <button
              className={`p-2 rounded-lg transition-colors ${transparent ? 'text-white' : 'text-foreground hover:bg-muted'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-2 bg-primary text-secondary rounded-full font-semibold text-center transition-all hover:bg-primary-dark"
              onClick={() => setIsOpen(false)}
            >
              {t.header.getQuote}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
