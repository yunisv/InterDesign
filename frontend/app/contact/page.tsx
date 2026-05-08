'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{c.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{c.sub}</p>
          </div>

          <ContactForm />

          <div className="mt-20 pt-20 border-t border-muted">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">{c.whyUs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-5xl font-serif font-bold text-primary mb-3">150+</p>
                <h3 className="text-xl font-semibold mb-2">{c.stat1Title}</h3>
                <p className="text-muted-foreground">{c.stat1Sub}</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-serif font-bold text-primary mb-3">8+</p>
                <h3 className="text-xl font-semibold mb-2">{c.stat2Title}</h3>
                <p className="text-muted-foreground">{c.stat2Sub}</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-serif font-bold text-primary mb-3">100%</p>
                <h3 className="text-xl font-semibold mb-2">{c.stat3Title}</h3>
                <p className="text-muted-foreground">{c.stat3Sub}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
