'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, MessageSquare, Settings, LogOut, ChevronRight } from 'lucide-react'
import { getToken, removeToken, authApi } from '@/lib/api'

const navItems = [
  { href: '/admin/portfolio', label: 'Портфолио', icon: LayoutGrid },
  { href: '/admin/contacts',  label: 'Заявки',    icon: MessageSquare },
  { href: '/admin/settings',  label: 'Настройки', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login') { setReady(true); return }
    const token = getToken()
    if (!token) { router.replace('/admin/login'); return }
    authApi.me()
      .then(u => { setUsername(u.username); setReady(true) })
      .catch(() => { removeToken(); router.replace('/admin/login') })
  }, [pathname, router])

  const logout = () => { removeToken(); router.push('/admin/login') }

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-950 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800">
          <Link href="/admin/portfolio" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-gray-950 font-bold text-sm">ID</div>
            <span className="text-white font-semibold text-sm">Admin Panel</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500 text-gray-950'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}>
                <Icon size={18} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm truncate">{username}</span>
            <button onClick={logout} title="Выйти"
              className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
