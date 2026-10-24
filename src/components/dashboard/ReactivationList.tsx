'use client'

import { demoFetch } from '@/lib/demoApi'
import { useState } from 'react'
import type { ReactivationItem } from '@/lib/types'
import { Sparkles, CheckCircle, Clock, UserCheck } from 'lucide-react'

const STATUS_BADGE: Record<ReactivationItem['status'], { label: string; cls: string }> = {
  idle: { label: 'Ожидает', cls: 'bg-ink-100 text-ink-500' },
  messaged: { label: 'Написано', cls: 'bg-mint-100 text-mint-600' },
  replied: { label: 'Ответил', cls: 'bg-blue-100 text-blue-700' },
  booked: { label: 'Записан', cls: 'bg-brand-50 text-brand-dark' },
}

export default function ReactivationList({
  items,
}: {
  items: ReactivationItem[]
}) {
  const [loading, setLoading] = useState<number | null>(null)
  const [localItems, setLocalItems] = useState<ReactivationItem[]>(items)

  // Sync when parent updates
  if (items.length !== localItems.length ||
    items.some((item, i) => item.status !== localItems[i]?.status)) {
    setLocalItems(items)
  }

  async function handleMessage(index: number) {
    setLoading(index)
    try {
      await demoFetch('/api/reactivation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      })
      setLocalItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, status: 'messaged' } : item)),
      )
    } catch {
      // silent — poller will sync on next tick
    } finally {
      setLoading(null)
    }
  }

  if (localItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
        <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Реактивация</h2>
        <p className="text-ink-400 text-sm">
          Список спящих пациентов пуст. Появится, когда ИИ найдёт кандидатов по базе.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Реактивация</h2>
      <ul className="space-y-2">
        {localItems.map((item, i) => {
          const badge = STATUS_BADGE[item.status]
          const isIdle = item.status === 'idle'
          const isLoading = loading === i

          return (
            <li
              key={i}
              className="flex flex-col gap-2 py-2 border-b border-ink-100 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2 min-w-0">
                <UserCheck size={15} className="text-ink-300 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-ink-700 truncate">{item.name}</p>
                  <p className="text-xs text-ink-400">
                    Последний визит: {item.lastVisit}
                  </p>
                  <p className="text-xs text-ink-400 truncate">{item.reason}</p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-1 pl-6 sm:pl-0 shrink-0">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badge.cls}`}>
                  {badge.label}
                </span>
                {isIdle && (
                  <button
                    onClick={() => handleMessage(i)}
                    disabled={isLoading}
                    aria-label={`ИИ пишет пациенту ${item.name}`}
                    className="flex items-center gap-1 text-xs font-semibold text-brand bg-brand-50 hover:bg-brand-100 px-2 py-1 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? (
                      <span className="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles size={11} />
                    )}
                    ИИ пишет
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
