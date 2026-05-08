'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages, Language } from '@/locales/translations'

function LangSwitcher({ size = 'md' }: { size?: 'sm' | 'md' }) {
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

  const btnCls = size === 'sm'
    ? 'flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-muted text-sm font-semibold text-secondary hover:border-primary hover:text-primary transition-all'
    : 'flex items-center gap-1 px-3 py-1.5 rounded-lg border border-muted text-sm font-semibold text-secondary hover:border-primary hover:text-primary transition-all'

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

  const navLinks = [
    { href: '/', label: t.header.home },
    { href: '/portfolio', label: t.header.portfolio },
    { href: '/about', label: t.header.about },
    { href: '/faq', label: t.header.faq },
    { href: '/contact', label: t.header.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background font-bold text-lg">
              ID
            </div>
            <span className="hidden sm:block text-xl font-serif font-bold text-secondary">Interior Design</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors duration-300">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop: lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher />
            <Link href="/contact"
              className="px-6 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary-dark transition-all duration-300">
              {t.header.getQuote}
            </Link>
          </div>

          {/* Mobile: lang switcher + burger */}
          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher size="sm" />
            <button className="p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact"
              className="block px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary-dark transition-all text-center"
              onClick={() => setIsOpen(false)}>
              {t.header.getQuote}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
