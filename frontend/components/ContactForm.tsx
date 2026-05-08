'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { contactsApi } from '@/lib/api'
import { useSettings } from '@/contexts/SettingsContext'

export default function ContactForm() {
  const { t } = useLanguage()
  const f = t.contactForm
  const s = useSettings()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'kitchen',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await contactsApi.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        project_type: formData.projectType,
        message: formData.message,
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', projectType: 'kitchen', message: '' })
      }, 3000)
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Information */}
      <div className="lg:col-span-1">
        <h3 className="text-2xl font-serif font-bold mb-8">{f.getInTouch}</h3>
        <div className="space-y-6">
          {s.phone && (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{f.phone}</h4>
                <a href={`tel:${s.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{s.phone}</a>
              </div>
            </div>
          )}
          {s.email && (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{f.email}</h4>
                <a href={`mailto:${s.email}`} className="text-muted-foreground hover:text-primary transition-colors">{s.email}</a>
              </div>
            </div>
          )}
          {s.address && (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{f.address}</h4>
                <p className="text-muted-foreground">{s.address}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-4">{f.hours}</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            {s.hours_weekday && (
              <div className="flex justify-between">
                <span>{f.monFri}</span>
                <span>{s.hours_weekday}</span>
              </div>
            )}
            {s.hours_saturday && (
              <div className="flex justify-between">
                <span>{f.saturday}</span>
                <span>{s.hours_saturday}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{f.sunday}</span>
              <span>{f.closed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2">
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{f.success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">{f.fullName}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              placeholder={f.namePlaceholder} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">{f.emailLabel}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              placeholder={f.emailPlaceholder} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">{f.phoneLabel}</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              placeholder="+1 (234) 567-890" />
          </div>
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium mb-2">{f.projectType}</label>
            <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}
              className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
              <option value="kitchen">{f.ptKitchen}</option>
              <option value="bedroom">{f.ptBedroom}</option>
              <option value="bathroom">{f.ptBathroom}</option>
              <option value="living">{f.ptLiving}</option>
              <option value="full">{f.ptFull}</option>
              <option value="furniture">{f.ptFurniture}</option>
              <option value="other">{f.ptOther}</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">{f.message}</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
              className="w-full px-4 py-3 border border-muted rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              placeholder={f.messagePlaceholder} />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full px-6 py-4 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? '...' : f.send}
          </button>
        </div>
      </form>
    </div>
  )
}
