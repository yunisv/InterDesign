'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQItem from '@/components/FAQItem'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQPage() {
  const { t } = useLanguage()
  const f = t.faq

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{f.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{f.sub}</p>
          </div>

          <div className="space-y-4 mb-16">
            {f.questions.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">{f.stillQ}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{f.stillSub}</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
            >
              {f.contactBtn}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
