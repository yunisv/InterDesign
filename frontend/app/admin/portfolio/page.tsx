'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Upload, GripVertical, ImageOff } from 'lucide-react'
import { portfolioApi, PortfolioItem, API_URL } from '@/lib/api'

const CATEGORIES = ['Kitchen', 'Bedroom', 'Living', 'Bathroom']
const LANGS = ['ru', 'en', 'az'] as const
const LANG_LABELS = { ru: 'RU', en: 'EN', az: 'AZ' }

const EMPTY_FORM = {
  title_ru: '', title_en: '', title_az: '',
  desc_ru: '',  desc_en: '',  desc_az: '',
  category: 'Kitchen', images: [] as string[], order: 0,
}

type FormData = typeof EMPTY_FORM

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [activeLang, setActiveLang] = useState<typeof LANGS[number]>('ru')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    try { setItems(await portfolioApi.list()) }
    catch { /* ignore */ }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setActiveLang('ru'); setModal('add') }
  const openEdit = (item: PortfolioItem) => {
    setForm({
      title_ru: item.title_ru, title_en: item.title_en, title_az: item.title_az,
      desc_ru: item.desc_ru,   desc_en: item.desc_en,   desc_az: item.desc_az,
      category: item.category, images: [...item.images], order: item.order,
    })
    setEditId(item.id)
    setActiveLang('ru')
    setModal('edit')
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    try {
      const names = await Promise.all(Array.from(files).map(f => portfolioApi.upload(f)))
      setForm(f => ({ ...f, images: [...f.images, ...names] }))
    } catch (e) { alert('Ошибка загрузки: ' + (e as Error).message) }
    finally { setUploading(false) }
  }

  const removeImage = (filename: string) =>
    setForm(f => ({ ...f, images: f.images.filter(x => x !== filename) }))

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await portfolioApi.create(form)
      else if (editId) await portfolioApi.update(editId, form)
      setModal(null)
      load()
    } catch (e) { alert('Ошибка: ' + (e as Error).message) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try { await portfolioApi.delete(deleteId); setDeleteId(null); load() }
    catch (e) { alert('Ошибка: ' + (e as Error).message) }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Портфолио</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} проектов</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16} /> Добавить проект
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ImageOff size={48} className="mx-auto mb-3 opacity-30" />
          <p>Нет проектов. Добавьте первый!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium w-14">#</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium w-20">Фото</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Название (RU)</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Категория</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Фото</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Порядок</th>
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{item.id}</td>
                  <td className="px-4 py-3">
                    {item.images[0] ? (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={`${API_URL}/uploads/${item.images[0]}`} alt="" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ImageOff size={14} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.title_ru || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.images.length} шт.</td>
                  <td className="px-4 py-3 text-gray-500">{item.order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openEdit(item)}
                        className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                        <Pencil size={15} />
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

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{modal === 'add' ? 'Добавить проект' : 'Редактировать проект'}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Lang tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                {LANGS.map(l => (
                  <button key={l} onClick={() => setActiveLang(l)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      activeLang === l ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                    }`}>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Название ({LANG_LABELS[activeLang]})
                </label>
                <input
                  value={form[`title_${activeLang}`]}
                  onChange={e => setForm(f => ({ ...f, [`title_${activeLang}`]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder={`Название на ${LANG_LABELS[activeLang]}`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Описание ({LANG_LABELS[activeLang]})
                </label>
                <textarea
                  rows={3}
                  value={form[`desc_${activeLang}`]}
                  onChange={e => setForm(f => ({ ...f, [`desc_${activeLang}`]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder={`Описание на ${LANG_LABELS[activeLang]}`}
                />
              </div>

              {/* Category + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Порядок</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Фотографии</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.map(img => (
                    <div key={img} className="relative w-24 h-20 rounded-xl overflow-hidden group border border-gray-200">
                      <Image src={`${API_URL}/uploads/${img}`} alt="" fill className="object-cover" />
                      <button
                        onClick={() => removeImage(img)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-24 h-20 border-2 border-dashed border-gray-300 hover:border-amber-400 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-amber-500 transition-all text-xs gap-1">
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><Upload size={16} /><span>Загрузить</span></>
                    )}
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={e => handleUpload(e.target.files)} />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setModal(null)}
                className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Отмена
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50">
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-2">Удалить проект?</h3>
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
