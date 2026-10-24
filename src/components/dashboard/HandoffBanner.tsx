'use client'

import { AlertTriangle } from 'lucide-react'

export default function HandoffBanner({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="flex items-center gap-3 bg-brand text-white rounded-2xl px-4 py-3 shadow-soft">
      <AlertTriangle size={20} className="shrink-0" />
      <p className="font-semibold text-sm leading-snug">
        Сложный случай передан врачу — ожидайте звонка от специалиста.
      </p>
    </div>
  )
}
