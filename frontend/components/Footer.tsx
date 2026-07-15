'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSettings } from '@/contexts/SettingsContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()
  const f = t.footer
  const h = t.header
  const s = useSettings()

  return (
    <footer className="bg-secondary text-white/70 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-11 mb-14">
          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 grid place-items-center bg-primary text-secondary rounded-lg font-serif font-bold text-lg">ID</span>
              <span className="font-serif text-xl font-semibold text-white">{s.company_name || 'Interior Design Studio'}</span>
            </div>
            <p className="max-w-xs leading-relaxed text-sm">{f.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{f.quickLinks}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="text-white/70 hover:text-primary transition-colors">{h.home}</Link>
              <Link href="/portfolio" className="text-white/70 hover:text-primary transition-colors">{h.portfolio}</Link>
              <Link href="/about" className="text-white/70 hover:text-primary transition-colors">{h.about}</Link>
              <Link href="/contact" className="text-white/70 hover:text-primary transition-colors">{h.contact}</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{f.services}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <span className="hover:text-primary transition-colors cursor-default">{f.kitchenDesign}</span>
              <span className="hover:text-primary transition-colors cursor-default">{f.bedroomDesign}</span>
              <span className="hover:text-primary transition-colors cursor-default">{f.customFurniture}</span>
              <span className="hover:text-primary transition-colors cursor-default">{f.fullRenovations}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">{f.contact}</h4>
            <div className="space-y-3 text-sm">
              {s.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 flex-shrink-0 text-primary" />
                  <a href={`tel:${s.phone}`} className="text-white/70 hover:text-primary transition-colors">{s.phone}</a>
                </div>
              )}
              {s.email && (
                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 flex-shrink-0 text-primary" />
                  <a href={`mailto:${s.email}`} className="text-white/70 hover:text-primary transition-colors">{s.email}</a>
                </div>
              )}
              {s.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>{s.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>&copy; {currentYear} {s.company_name || 'Interior Design Studio'}. {f.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-primary transition-colors">{f.privacy}</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors">{f.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
