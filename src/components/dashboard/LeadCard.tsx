'use client'

import type { Lead } from '@/lib/types'
import { User, Phone, Stethoscope, AlertCircle } from 'lucide-react'

const URGENCY_LABEL: Record<string, string> = {
  low: 'Несрочно',
  med: 'Умеренно',
  high: 'Срочно',
}

const URGENCY_CLASS: Record<string, string> = {
  low: 'bg-ink-100 text-ink-500',
  med: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
}

const STAGE_LABEL: Record<string, string> = {
  new: 'Новый',
  qualifying: 'Квалификация',
  qualified: 'Квалифицирован',
  booked: 'Записан',
  handoff: 'Передан врачу',
}

const STAGE_CLASS: Record<string, string> = {
  new: 'bg-ink-100 text-ink-500',
  qualifying: 'bg-blue-100 text-blue-700',
  qualified: 'bg-mint-100 text-mint-600',
  booked: 'bg-brand-50 text-brand-dark',
  handoff: 'bg-orange-100 text-orange-700',
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-ink-700 text-sm uppercase tracking-wide">Лид</h2>
        <div className="flex gap-1.5 flex-wrap justify-end">
          {lead.stage && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STAGE_CLASS[lead.stage] ?? 'bg-ink-100 text-ink-500'}`}>
              {STAGE_LABEL[lead.stage] ?? lead.stage}
            </span>
          )}
          {lead.urgency && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${URGENCY_CLASS[lead.urgency] ?? 'bg-ink-100 text-ink-500'}`}>
              {URGENCY_LABEL[lead.urgency] ?? lead.urgency}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <Row icon={<User size={14} className="text-ink-400" />} label="Имя" value={lead.name ?? '—'} />
        <Row icon={<Phone size={14} className="text-ink-400" />} label="Телефон" value={lead.phone ?? '—'} />
        <Row icon={<Stethoscope size={14} className="text-ink-400" />} label="Услуга" value={lead.service ?? '—'} />
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
      <span className="text-ink-400 shrink-0 w-16">{label}</span>
      <span className="text-ink-700 font-medium break-all">{value}</span>
    </div>
  )
}
