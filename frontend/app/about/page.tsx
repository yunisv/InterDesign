'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Award, Users, Lightbulb } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  const valueIcons = [Lightbulb, Users, Award, Lightbulb]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{a.heroTitle}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{a.heroSub}</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white border-y border-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{a.storyTitle}</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{a.storyP1}</p>
                  <p>{a.storyP2}</p>
                  <p>{a.storyP3}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl h-96" />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">{a.valuesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {([
                { title: a.val1Title, desc: a.val1Desc },
                { title: a.val2Title, desc: a.val2Desc },
                { title: a.val3Title, desc: a.val3Desc },
                { title: a.val4Title, desc: a.val4Desc },
              ] as { title: string; desc: string }[]).map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <div key={i} className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">{a.offerTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {([
                { title: a.svc1Title, items: a.svc1Items },
                { title: a.svc2Title, items: a.svc2Items },
                { title: a.svc3Title, items: a.svc3Items },
                { title: a.svc4Title, items: a.svc4Items },
              ] as { title: string; items: string[] }[]).map((svc, i) => (
                <div key={i} className="p-6 border border-muted rounded-xl hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-serif font-bold mb-4">{svc.title}</h3>
                  <ul className="space-y-3">
                    {svc.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {([
                { val: '150+', label: a.stat1 },
                { val: '8+', label: a.stat2 },
                { val: '100%', label: a.stat3 },
                { val: '50+', label: a.stat4 },
              ] as { val: string; label: string }[]).map((s, i) => (
                <div key={i}>
                  <p className="text-5xl font-serif font-bold mb-2">{s.val}</p>
                  <p className="text-gray-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{a.ctaTitle}</h2>
            <p className="text-xl text-muted-foreground mb-8">{a.ctaSub}</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
            >
              {a.ctaBtn}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
