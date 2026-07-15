'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Carousel from '@/components/Carousel'
import ProjectsSlider from '@/components/ProjectsSlider'
import Reveal from '@/components/Reveal'
import TiltCard from '@/components/TiltCard'
import AnimatedCounter from '@/components/AnimatedCounter'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowRight, Sofa, UtensilsCrossed, Droplets, Home } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  const h = t.home
  const p = t.portfolio

  const heroRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = heroRef.current
    const bg = heroBgRef.current
    const content = heroContentRef.current
    if (!header || !bg || !content) return

    let tx = 0, ty = 0, cx = 0, cy = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      const r = header.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
    }
    const onLeave = () => { tx = 0; ty = 0 }

    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      bg.style.transform = `scale(1.03) translate(${cx * -26}px, ${cy * -26}px)`
      content.style.transform = `translate(${cx * 14}px, ${cy * 10}px)`
      raf = requestAnimationFrame(loop)
    }

    header.addEventListener('pointermove', onMove)
    header.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      header.removeEventListener('pointermove', onMove)
      header.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const portfolioSlides = [
    { id: 1, title: p.bedroom, image: '/portfolio-bedroom-1.jpg', category: p.bedroom },
    { id: 2, title: p.living, image: '/portfolio-living-1.jpg', category: p.living },
    { id: 3, title: p.kitchen, image: '/portfolio-kitchen-1.jpg', category: p.kitchen },
    { id: 4, title: p.bathroom, image: '/portfolio-bathroom-1.jpg', category: p.bathroom },
  ]

  const services = [
    { icon: UtensilsCrossed, title: h.svc1Title, sub: h.svc1Sub, desc: h.svcDesc1 },
    { icon: Sofa, title: h.svc2Title, sub: h.svc2Sub, desc: h.svcDesc2 },
    { icon: Home, title: h.svc3Title, sub: h.svc3Sub, desc: h.svcDesc3 },
    { icon: Droplets, title: h.svc4Title, sub: h.svc4Sub, desc: h.svcDesc4 },
  ]

  const stats = [
    { value: 28, label: h.stat1 },
    { value: 2013, label: h.stat2 },
    { value: 338, label: h.stat3 },
    { value: 215, label: h.stat4 },
  ]

  const portfolioCategories = [
    { title: h.cat1Title, sub: h.cat1Sub, image: '/portfolio-living-1.jpg' },
    { title: h.cat2Title, sub: h.cat2Sub, image: '/portfolio-bedroom-1.jpg' },
    { title: h.cat3Title, sub: h.cat3Sub, image: '/portfolio-kitchen-2.jpg' },
    { title: h.cat4Title, sub: h.cat4Sub, image: '/portfolio-bathroom-1.jpg' },
  ]

  const projectExamples = [
    { title: h.proj1Title, subtitle: h.proj1Sub, image: '/portfolio-living-1.jpg' },
    { title: h.proj2Title, subtitle: h.proj2Sub, image: '/portfolio-kitchen-1.jpg' },
    { title: h.proj3Title, subtitle: h.proj3Sub, image: '/portfolio-kitchen-2.jpg' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden bg-background">

        {/* Hero */}
        <section ref={heroRef} className="relative h-screen min-h-[680px] w-full overflow-hidden">
          <div ref={heroBgRef} className="absolute -inset-[2%] will-change-transform">
            <Image src="/uxxk3ka0wru2jb70dh0lzzr3qno9h5m7.jpg" alt="Hero" fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
          <div ref={heroContentRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <Reveal>
              <div className="text-[13px] tracking-[4px] uppercase text-white/85 font-semibold mb-5">
                {h.heroEyebrow}
              </div>
            </Reveal>
            <h1 className="m-0 font-serif font-semibold text-white leading-[0.98] text-[clamp(48px,7.4vw,112px)] [text-shadow:0_4px_40px_rgba(0,0,0,.35)]">
              <Reveal delay={80}><span className="block">{h.heroTitle.split(' ').slice(0, -1).join(' ')}</span></Reveal>
              <Reveal delay={220}><span className="block italic text-primary">{h.heroTitle.split(' ').slice(-1)}</span></Reveal>
            </h1>
            <Reveal delay={360}>
              <p className="mt-7 max-w-xl mx-auto text-[clamp(16px,1.4vw,19px)] leading-relaxed text-white/90">
                {h.heroSub}
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="flex gap-4 mt-10 flex-wrap justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2.5 bg-primary text-secondary font-semibold text-base px-9 py-[17px] rounded-full transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(201,143,60,.8)] group"
                >
                  {h.viewPortfolio}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-white/10 text-white font-semibold text-base px-9 py-[17px] rounded-full border border-white/50 backdrop-blur transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
                >
                  {h.getQuote}
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 text-white/75">
            <span className="text-[11px] tracking-[3px] uppercase">{h.exploreLabel}</span>
            <span className="relative w-[22px] h-9 border border-white/60 rounded-full overflow-hidden">
              <span className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[3px] h-2 bg-white rounded-full animate-[scrollpulse_1.5s_ease-in-out_infinite]" />
            </span>
          </div>
        </section>

        {/* Featured Portfolio */}
        <section id="featured" className="relative bg-background py-28 md:py-32 px-6">
          <div className="max-w-[1240px] mx-auto">
            <Reveal className="text-center mb-14">
              <div className="text-xs tracking-[4px] uppercase text-primary-dark font-bold mb-4">{h.portfolioEyebrow}</div>
              <h2 className="m-0 font-serif font-semibold text-[clamp(38px,5vw,66px)] leading-none text-foreground">{h.featuredTitle}</h2>
              <p className="mt-5 max-w-xl mx-auto text-muted-foreground text-[17px] leading-relaxed">{h.featuredSub}</p>
            </Reveal>
            <Reveal>
              <Carousel interval={5200} autoPlay>
                {portfolioSlides.map((slide) => (
                  <div key={slide.id} className="relative w-full" style={{ height: 'min(60vh, 560px)' }}>
                    <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute left-9 bottom-9 z-[2] pointer-events-none">
                      <span className="inline-block bg-primary text-secondary font-semibold text-[13px] px-4 py-1.5 rounded-full mb-3.5">
                        {slide.category}
                      </span>
                      <div className="font-serif text-3xl md:text-[38px] text-white font-semibold leading-none">{slide.title}</div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Reveal>
            <Reveal className="text-center mt-12">
              <Link href="/portfolio" className="inline-flex items-center gap-2 font-semibold text-[15px] text-foreground hover:text-primary transition-colors group">
                {h.viewAll}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Stats + Category cards */}
        <section className="relative bg-char text-[#f0e9de] py-28 md:py-32 px-6">
          <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-wrap gap-10 items-end justify-between mb-16">
              <Reveal>
                <h2 className="m-0 font-serif font-medium text-[clamp(30px,3.4vw,46px)] leading-[1.05] max-w-[340px] whitespace-pre-line">
                  {h.statsTitle}
                </h2>
              </Reveal>
              <div className="flex flex-wrap gap-8 md:gap-14">
                {stats.map((stat, i) => (
                  <Reveal key={i} delay={i * 90} className="min-w-[110px]">
                    <AnimatedCounter
                      target={stat.value}
                      className="font-serif font-semibold text-[clamp(48px,5vw,76px)] leading-none text-white"
                    />
                    <div className="mt-2 text-[13px] text-white/55 leading-snug whitespace-pre-line">{stat.label}</div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {portfolioCategories.map((cat, i) => (
                <Reveal key={i} delay={i * 120}>
                  <TiltCard className="relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-30px_rgba(0,0,0,.7)]">
                    <Image src={cat.image} alt={cat.sub} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
                    <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between pointer-events-none" style={{ transform: 'translateZ(40px)' }}>
                      <div className="font-serif text-2xl text-white font-semibold leading-[1.05]">
                        {cat.title}<br />{cat.sub}
                      </div>
                      <span className="grid place-items-center w-[38px] h-[38px] rounded-full bg-primary text-secondary text-[17px]">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-char overflow-hidden py-4">
          <div className="flex w-max gap-10 animate-[marquee_32s_linear_infinite] opacity-10 text-[#f0e9de] font-serif italic text-[40px] md:text-[64px] whitespace-nowrap">
            <span>{h.marquee}</span>
            <span>{h.marquee}</span>
          </div>
        </div>

        {/* Gallery */}
        <section className="bg-background py-28 md:py-32 px-6">
          <div className="max-w-[1240px] mx-auto">
            <Reveal className="mb-11">
              <div className="text-xs tracking-[4px] uppercase text-primary-dark font-bold mb-4">{h.galleryEyebrow}</div>
              <h2 className="m-0 font-serif font-semibold text-[clamp(34px,4.4vw,58px)] leading-none text-foreground">{h.projectsTitle}</h2>
            </Reveal>
            <Reveal>
              <ProjectsSlider projects={projectExamples} />
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white py-28 md:py-32 px-6">
          <div className="max-w-[1240px] mx-auto">
            <Reveal className="text-center mb-16">
              <div className="text-xs tracking-[4px] uppercase text-primary-dark font-bold mb-4">{h.servicesEyebrow}</div>
              <h2 className="m-0 font-serif font-semibold text-[clamp(38px,5vw,66px)] leading-none text-foreground">{h.servicesTitle}</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc, i) => {
                const Icon = svc.icon
                return (
                  <Reveal key={i} delay={i * 120}>
                    <TiltCard className="relative p-9 pb-8 rounded-2xl bg-background border border-foreground/10 hover:bg-white transition-colors duration-500 h-full">
                      <div className="flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                        <span className="font-serif text-[15px] tracking-[3px] text-primary-dark font-semibold">{String(i + 1).padStart(2, '0')}</span>
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div className="w-10 h-px bg-primary my-5" />
                      <h3 className="m-0 font-serif text-[27px] font-semibold text-foreground" style={{ transform: 'translateZ(24px)' }}>
                        {svc.title}{svc.sub ? ` ${svc.sub}` : ''}
                      </h3>
                      <p className="mt-3.5 text-muted-foreground text-[15px] leading-relaxed">{svc.desc}</p>
                    </TiltCard>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-32 md:py-36 px-6">
          <div className="absolute inset-0">
            <Image src="/00.webp" alt="CTA background" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <Reveal className="relative z-[2] max-w-[1240px] mx-auto">
            <h2 className="m-0 font-serif font-semibold text-white text-[clamp(36px,5vw,68px)] leading-[1.02] max-w-xl">{h.ctaTitle}</h2>
            <p className="mt-6 text-white/85 text-lg leading-relaxed max-w-lg">{h.ctaSub}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 mt-9 bg-primary text-secondary font-semibold text-base px-9 py-[18px] rounded-full transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(201,143,60,.8)] group"
            >
              {h.ctaBtn}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  )
}
