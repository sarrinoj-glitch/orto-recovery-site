'use client'

import type { Booking, Reminder } from '@/lib/types'
import { Bell } from 'lucide-react'

const OFFSETS: Array<{ key: Reminder['offset']; label: string }> = [
  { key: '24h', label: 'за 24 ч' },
  { key: '12h', label: 'за 12 ч' },
  { key: '3h', label: 'за 3 ч' },
  { key: '1h', label: 'за 1 ч' },
]

export default function RemindersTimeline({
  booking,
  reminders,
}: {
  booking: Booking
  reminders: Reminder[]
}) {
  const byOffset = Object.fromEntries(reminders.map((r) => [r.offset, r]))

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Bell size={16} className="text-ink-400" />
        <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Напоминания</h2>
      </div>

      {!booking && (
        <p className="text-ink-400 text-xs leading-relaxed">
          Напоминания появятся автоматически после создания записи.
        </p>
      )}

      {/* Mobile: 2×2 grid; desktop (sm+): single row with connector lines */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {OFFSETS.map((item) => {
          const reminder = byOffset[item.key]
          const active = !!booking
          const sent = reminder?.sent ?? false

          return (
            <div key={item.key} className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  !active
                    ? 'bg-ink-100 text-ink-300'
                    : sent
                    ? 'bg-mint-500 text-white'
                    : 'bg-brand-50 border-2 border-brand text-brand'
                }`}
              >
                <Bell size={12} />
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight ${
                  !active ? 'text-ink-300' : sent ? 'text-mint-600' : 'text-brand'
                }`}
              >
                {reminder?.label ?? item.label}
              </span>
              {sent && (
                <span className="text-[9px] text-mint-500 font-semibold">Отправлено</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="hidden sm:flex items-center gap-0">
        {OFFSETS.map((item, i) => {
          const reminder = byOffset[item.key]
          const active = !!booking
          const sent = reminder?.sent ?? false

          return (
            <div key={item.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    !active
                      ? 'bg-ink-100 text-ink-300'
                      : sent
                      ? 'bg-mint-500 text-white'
                      : 'bg-brand-50 border-2 border-brand text-brand'
                  }`}
                >
                  <Bell size={12} />
                </div>
                <span
                  className={`text-[10px] font-medium text-center leading-tight ${
                    !active ? 'text-ink-300' : sent ? 'text-mint-600' : 'text-brand'
                  }`}
                >
                  {reminder?.label ?? item.label}
                </span>
                {sent && (
                  <span className="text-[9px] text-mint-500 font-semibold">Отправлено</span>
                )}
              </div>
              {i < OFFSETS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-0.5 ${
                    active ? 'bg-brand-100' : 'bg-ink-100'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
