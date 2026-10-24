'use client'

import type { Booking } from '@/lib/types'
import { CalendarCheck, User, Clock, CalendarX } from 'lucide-react'

export default function BookingCard({ booking }: { booking: Booking }) {
  if (!booking) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
        <div className="flex items-center gap-2">
          <CalendarX size={16} className="text-ink-300" />
          <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Запись</h2>
        </div>
        <p className="text-ink-400 text-sm leading-relaxed">
          Записи пока нет. Как только ассистент согласует время с пациентом — запись появится здесь.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck size={16} className="text-mint-500" />
          <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Запись</h2>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-mint-600 bg-mint-100 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-mint-500 inline-block" />
          Записан
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <Row icon={<CalendarCheck size={14} className="text-ink-400" />} label="Услуга" value={booking.service} />
        <Row icon={<User size={14} className="text-ink-400" />} label="Врач" value={booking.doctor} />
        <Row icon={<Clock size={14} className="text-ink-400" />} label="Дата и время" value={booking.datetime} />
      </div>
    </div>
  )
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="text-ink-400 shrink-0 w-24">{label}</span>
      <span className="text-ink-700 font-medium">{value}</span>
    </div>
  )
}
