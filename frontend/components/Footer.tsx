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
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{s.company_name || 'Interior Design Studio'}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{f.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{f.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="text-gray-300 hover:text-primary transition-colors">{h.home}</Link></li>
              <li><Link href="/portfolio" className="text-gray-300 hover:text-primary transition-colors">{h.portfolio}</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary transition-colors">{h.about}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">{h.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{f.services}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{f.kitchenDesign}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{f.bedroomDesign}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{f.customFurniture}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">{f.fullRenovations}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{f.contact}</h4>
            <div className="space-y-3 text-sm text-gray-300">
              {s.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                  <a href={`tel:${s.phone}`} className="text-gray-300 hover:text-primary transition-colors">{s.phone}</a>
                </div>
              )}
              {s.email && (
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                  <a href={`mailto:${s.email}`} className="text-gray-300 hover:text-primary transition-colors">{s.email}</a>
                </div>
              )}
              {s.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>{s.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} {s.company_name || 'Interior Design Studio'}. {f.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">{f.privacy}</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">{f.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
