'use client'

import { useState, useEffect } from 'react'
import { Trash2, Eye, Mail, Phone, MessageSquare } from 'lucide-react'
import { contactsApi, ContactItem } from '@/lib/api'

export default function ContactsAdminPage() {
  const [items, setItems] = useState<ContactItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactItem | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const load = async () => {
    try { setItems(await contactsApi.list()) }
    catch { /* ignore */ }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openContact = async (item: ContactItem) => {
    setSelected(item)
    if (!item.is_read) {
      await contactsApi.markRead(item.id)
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_read: true } : i))
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await contactsApi.delete(deleteId)
    setDeleteId(null)
    if (selected?.id === deleteId) setSelected(null)
    load()
  }

  const unread = items.filter(i => !i.is_read).length

  const projectTypeLabel: Record<string, string> = {
    kitchen: 'Дизайн кухни', bedroom: 'Дизайн спальни',
    bathroom: 'Дизайн ванной', living: 'Дизайн гостиной',
    full: 'Полный редизайн', furniture: 'Мебель на заказ', other: 'Другое',
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {items.length} всего{unread > 0 && <span className="ml-2 text-amber-600 font-medium">· {unread} новых</span>}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Имя</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Тип проекта</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Дата</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Статус</th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!item.is_read ? 'bg-amber-50/40' : ''}`}
                  onClick={() => openContact(item)}>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${!item.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.email}</td>
                  <td className="px-4 py-3 text-gray-500">{projectTypeLabel[item.project_type] ?? item.project_type}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmt(item.created_at)}</td>
                  <td className="px-4 py-3">
                    {item.is_read
                      ? <span className="text-gray-400 text-xs">Прочитано</span>
                      : <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Новое</span>
                    }
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openContact(item)}
                        className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{selected.name}</h2>
                <p className="text-gray-400 text-xs mt-0.5">{fmt(selected.created_at)}</p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                {projectTypeLabel[selected.project_type] ?? selected.project_type}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" />
                <a href={`mailto:${selected.email}`} className="hover:text-amber-600 transition-colors">{selected.email}</a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <a href={`tel:${selected.phone}`} className="hover:text-amber-600 transition-colors">{selected.phone}</a>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
              {selected.message}
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setSelected(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Закрыть
              </button>
              <button onClick={() => { setDeleteId(selected.id); setSelected(null) }}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                <Trash2 size={14} /> Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Удалить заявку?</h3>
            <p className="text-gray-500 text-sm mb-5">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Отмена
              </button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
