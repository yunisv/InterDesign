export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token)
}

export function removeToken() {
  localStorage.removeItem('admin_token')
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers as Record<string, string> || {}) },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

// ── Auth ────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<{ access_token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => apiFetch<{ id: number; username: string }>('/api/auth/me'),
}

// ── Portfolio ────────────────────────────────────────
export interface PortfolioItem {
  id: number
  title_ru: string; title_en: string; title_az: string
  desc_ru: string;  desc_en: string;  desc_az: string
  category: string
  images: string[]
  order: number
  created_at: string
}

export const portfolioApi = {
  list: () => apiFetch<PortfolioItem[]>('/api/portfolio'),
  create: (data: Omit<PortfolioItem, 'id' | 'created_at'>) =>
    apiFetch<PortfolioItem>('/api/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<PortfolioItem>) =>
    apiFetch<PortfolioItem>(`/api/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch(`/api/portfolio/${id}`, { method: 'DELETE' }),
  upload: async (file: File): Promise<string> => {
    const form = new FormData()
    form.append('file', file)
    const token = getToken()
    const res = await fetch(`${API_URL}/api/portfolio/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })
    if (!res.ok) throw new Error('Upload failed')
    const json = await res.json() as { filename: string }
    return json.filename
  },
  imageUrl: (filename: string) => `${API_URL}/uploads/${filename}`,
}

// ── Contacts ─────────────────────────────────────────
export interface ContactItem {
  id: number
  name: string; email: string; phone?: string
  project_type: string; message: string
  is_read: boolean; created_at: string
}

export const contactsApi = {
  list: () => apiFetch<ContactItem[]>('/api/contacts'),
  markRead: (id: number) => apiFetch(`/api/contacts/${id}/read`, { method: 'PATCH' }),
  delete: (id: number) => apiFetch(`/api/contacts/${id}`, { method: 'DELETE' }),
  submit: (data: { name: string; email: string; phone?: string; project_type: string; message: string }) =>
    apiFetch('/api/contacts', { method: 'POST', body: JSON.stringify(data) }),
}

// ── Settings ─────────────────────────────────────────
export const settingsApi = {
  get: () => apiFetch<{ settings: Record<string, string> }>('/api/settings'),
  update: (settings: Record<string, string>) =>
    apiFetch('/api/settings', { method: 'PUT', body: JSON.stringify({ settings }) }),
}
