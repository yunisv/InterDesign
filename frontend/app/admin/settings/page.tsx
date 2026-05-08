'use client'

import { useState, useEffect } from 'react'
import { settingsApi } from '@/lib/api'

const FIELDS = [
  { key: 'company_name', label: 'Название компании' },
  { key: 'phone',        label: 'Телефон' },
  { key: 'email',        label: 'Email' },
  { key: 'address',      label: 'Адрес' },
  { key: 'hours_weekday',  label: 'Часы работы (пн–пт)' },
  { key: 'hours_saturday', label: 'Часы работы (сб)' },
  { key: 'telegram',     label: 'Telegram (ссылка)' },
  { key: 'instagram',    label: 'Instagram (ссылка)' },
]

export default function SettingsAdminPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    settingsApi.get()
      .then(r => setValues(r.settings))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await settingsApi.update(values)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      alert('Ошибка: ' + (e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500 text-sm mt-0.5">Контактные данные и информация о студии</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-xl">
          <div className="space-y-4">
            {FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input
                  value={values[key] ?? ''}
                  onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button onClick={handleSave} disabled={saving}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50">
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
            {saved && <span className="text-green-600 text-sm font-medium">✓ Сохранено</span>}
          </div>
        </div>
      )}
    </div>
  )
}
