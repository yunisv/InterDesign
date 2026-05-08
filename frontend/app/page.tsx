'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel'
import ProjectsSlider from '@/components/ProjectsSlider'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sofa, UtensilsCrossed, Droplets, Home } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  const h = t.home
  const p = t.portfolio

  const portfolioSlides = [
    { id: 1, title: p.kitchen,  description: '', image: '/portfolio-kitchen-1.jpg',  category: p.kitchen },
    { id: 2, title: p.bedroom,  description: '', image: '/portfolio-bedroom-1.jpg',  category: p.bedroom },
    { id: 3, title: p.living,   description: '', image: '/portfolio-living-1.jpg',   category: p.living },
    { id: 4, title: p.bathroom, description: '', image: '/portfolio-bathroom-1.jpg', category: p.bathroom },
  ]

  const serviceIcons = [UtensilsCrossed, Sofa, Home, Droplets]
  const services = [
    { icon: UtensilsCrossed, title: h.svc1Title, sub: h.svc1Sub, desc: h.svcDesc1 },
    { icon: Sofa,            title: h.svc2Title, sub: h.svc2Sub, desc: h.svcDesc2 },
    { icon: Home,            title: h.svc3Title, sub: h.svc3Sub, desc: h.svcDesc3 },
    { icon: Droplets,        title: h.svc4Title, sub: h.svc4Sub, desc: h.svcDesc4 },
  ]

  const stats = [
    { value: '28',   label: h.stat1 },
    { value: '2013', label: h.stat2 },
    { value: '338',  label: h.stat3 },
    { value: '215',  label: h.stat4 },
  ]

  const portfolioCategories = [
    { title: h.cat1Title, subtitle: h.cat1Sub, image: '/portfolio-living-1.jpg',  href: '/portfolio', featured: true },
    { title: h.cat2Title, subtitle: h.cat2Sub, image: '/portfolio-kitchen-1.jpg', href: '/portfolio' },
    { title: h.cat3Title, subtitle: h.cat3Sub, image: '/portfolio-kitchen-2.jpg', href: '/portfolio', featured: true },
    { title: h.cat4Title, subtitle: h.cat4Sub, image: '/portfolio-bathroom-1.jpg',href: '/portfolio' },
  ]

  const projectExamples = [
    { title: h.proj1Title, subtitle: h.proj1Sub, image: '/portfolio-living-1.jpg' },
    { title: h.proj2Title, subtitle: h.proj2Sub, image: '/portfolio-kitchen-1.jpg' },
    { title: h.proj3Title, subtitle: h.proj3Sub, image: '/portfolio-kitchen-2.jpg' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="relative h-screen pt-20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image src="/hero-interior.jpg" alt="Hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance leading-tight">
              {h.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance leading-relaxed">
              {h.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 group">
                {h.viewPortfolio}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300">
                {h.getQuote}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Portfolio */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{h.featuredTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{h.featuredSub}</p>
            </div>
            <div className="relative bg-muted rounded-2xl overflow-hidden h-96 md:h-[500px] shadow-lg">
              <Carousel interval={5000} autoPlay showDots showArrows>
                {portfolioSlides.map((slide) => (
                  <div key={slide.id} className="relative w-full h-full">
                    <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                      <span className="inline-block w-fit px-3 py-1 bg-primary text-background text-xs font-semibold rounded-lg mb-3">
                        {slide.category}
                      </span>
                      <h3 className="text-white text-2xl md:text-4xl font-serif font-bold mb-2">{slide.title}</h3>
                      <p className="text-gray-200 text-sm md:text-base">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="mt-8 text-center">
              <Link href="/portfolio"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group">
                {h.viewAll}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats + Portfolio Categories */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-14 items-start">
              <div className="md:col-span-1">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-snug whitespace-pre-line">
                  {h.statsTitle}
                </h2>
              </div>
              {stats.map((stat, i) => (
                <div key={i} className="md:col-span-1">
                  <p className="text-5xl md:text-6xl font-bold text-white leading-none mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-400 leading-snug whitespace-pre-line">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {portfolioCategories.map((cat, i) => (
                <Link key={i} href={cat.href}
                  className={`group relative overflow-hidden rounded-2xl${cat.featured ? ' md:-mt-6' : ''}`}
                  style={{ aspectRatio: '3/4' }}>
                  <Image src={cat.image} alt={cat.subtitle} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                    <div>
                      <p className={`leading-tight ${cat.featured ? 'text-white font-semibold text-base' : 'text-gray-300 text-sm'}`}>
                        {cat.title}
                      </p>
                      <p className={`font-bold leading-tight ${cat.featured ? 'text-white text-lg' : 'text-white text-base'}`}>
                        {cat.subtitle}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight size={16} className="text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Project Examples */}
        <section className="bg-secondary pt-2 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">{h.projectsTitle}</h2>
            <ProjectsSlider projects={projectExamples} />
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{h.servicesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((svc, i) => {
                const Icon = svc.icon
                return (
                  <div key={i} className="p-6 border border-muted rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-1">{svc.title}</h3>
                    {svc.sub && <p className="text-base font-medium text-primary mb-2">{svc.sub}</p>}
                    <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24 text-white">
          <div className="absolute inset-0 -z-10">
            <Image src="/portfolio-living-1.jpg" alt="CTA background" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{h.ctaTitle}</h2>
              <p className="text-lg text-gray-200 mb-8">{h.ctaSub}</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 group">
                {h.ctaBtn}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
