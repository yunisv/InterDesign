'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { settingsApi } from '@/lib/api'

type Settings = Record<string, string>

const SettingsContext = createContext<Settings>({})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    settingsApi.get()
      .then(r => setSettings(r.settings))
      .catch(() => {})
  }, [])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
