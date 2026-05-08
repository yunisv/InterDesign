'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortfolioGrid from '@/components/PortfolioGrid'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PortfolioPage() {
  const { t } = useLanguage()
  const p = t.portfolio

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{p.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{p.sub}</p>
          </div>
          <PortfolioGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}
