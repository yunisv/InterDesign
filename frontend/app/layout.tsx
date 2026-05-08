import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#f5e6d3',
}

export const metadata: Metadata = {
  title: 'Interior Design Studio | Furniture & Interior Design',
  description: 'Premium interior design, custom furniture, and kitchen design services. Transform your space with our elegant design solutions.',
  keywords: 'interior design, furniture, kitchen design, home renovation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
