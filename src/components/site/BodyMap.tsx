'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { BODY_AREAS, EXTRA_AREAS, CLINIC, type BodyArea } from '@/lib/clinic'
import { openChat } from '@/components/ChatWidget'
import { Waves, HandNote } from '@/components/site/Decor'

// Точки на фигуре: координаты в процентах от viewBox 200×420
const SPOTS: Record<string, { x: number; y: number }> = {
  back: { x: 50, y: 33 },
  arm: { x: 75.5, y: 40 },
  knee: { x: 41, y: 73.5 },
  foot: { x: 61, y: 94.5 },
}

const ALL = [...BODY_AREAS, ...EXTRA_AREAS]

function Figure({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const limb = { stroke: '#FFFFFF', strokeWidth: 26, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  return (
    <div className="relative mx-auto aspect-[200/420] w-[210px] sm:w-[240px]">
      <svg viewBox="0 0 200 420" className="h-full w-full" aria-hidden>
        <circle cx="100" cy="40" r="25" fill="#FFFFFF" />
        <path d="M100 66 L100 84" {...limb} strokeWidth={18} />
        <path d="M72 88 Q100 80 128 88 L134 196 Q100 208 66 196 Z" fill="#FFFFFF" />
        <path d="M72 96 L54 168 L48 232" {...limb} />
        <path d="M128 96 L146 168 L152 232" {...limb} />
        <path d="M86 200 L83 306 L81 388" {...limb} strokeWidth={30} />
        <path d="M114 200 L117 306 L119 388" {...limb} strokeWidth={30} />
        <path d="M80 396 L66 400" {...limb} strokeWidth={14} />
        <path d="M120 396 L134 400" {...limb} strokeWidth={14} />
      </svg>

      {BODY_AREAS.map((a) => {
        const s = SPOTS[a.id]
        const on = active === a.id
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => onPick(a.id)}
            aria-label={a.label}
            aria-pressed={on}
            className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            {on && <span className="hotspot-ring absolute inset-1.5 rounded-full bg-teal" />}
            <span
              className={clsx(
                'relative h-4 w-4 rounded-full border-[3px] transition-colors',
                on ? 'border-teal bg-lime' : 'border-teal bg-white hover:bg-teal-soft',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

function Panel({ area }: { area: BodyArea }) {
  return (
    <div>
      <h3 className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-graphite">{area.label}</h3>
      <p className="mt-3 max-w-[36rem] text-[17px] leading-relaxed text-graphite/70">{area.complaints}</p>

      <p className="mt-7 text-[15px] font-semibold text-graphite">Что может назначить врач после осмотра</p>
      <ul className="mt-3 divide-y divide-graphite/10 border-y border-graphite/10">
        {area.options.map((o) => (
          <li key={o.name} className="flex items-baseline justify-between gap-6 py-3 text-[15px]">
            <span className="text-graphite/80">{o.name}</span>
            <span className="shrink-0 font-semibold tabular-nums text-graphite">{o.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col gap-5 rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-teal/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[15px] text-graphite/60">Ведёт приём</p>
          <p className="mt-0.5 font-semibold text-graphite">{area.doctor}</p>
          <p className="text-[15px] text-graphite/60">
            {area.doctorRole}, приём <span className="whitespace-nowrap rounded bg-lime px-1.5 py-0.5 font-semibold text-graphite">{area.visit}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => openChat(area.chat)}
          className="h-12 shrink-0 rounded-full bg-teal px-6 text-[15px] font-medium text-white transition hover:bg-teal-dark"
        >
          Записаться на приём
        </button>
      </div>
      <p className="mt-4 text-sm text-graphite/50">
        Метод лечения выбирает врач после осмотра. Есть противопоказания. Вопросы — по телефону {CLINIC.phone}.
      </p>
    </div>
  )
}

export function BodyMap() {
  const [active, setActive] = useState('knee')
  const reduce = useReducedMotion()
  const area = ALL.find((a) => a.id === active) ?? ALL[0]

  return (
    <section id="pain" className="relative isolate scroll-mt-20 overflow-hidden bg-lagoon">
      <Waves className="-top-10 left-0 -z-10 h-36 w-full rotate-180" opacity={0.35} />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
          Покажите, где болит
        </h2>
        <p className="mt-4 max-w-xl text-lg text-graphite/65">
          Нажмите на точку или выберите из списка — подскажем, к кому идти и сколько это стоит.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[260px_220px_1fr] lg:gap-12">
          <div className="relative">
            <Figure active={active} onPick={setActive} />
            <HandNote className="-right-2 top-2 hidden lg:flex" arrow="none" color="text-teal">нажмите на точку</HandNote>
          </div>

          <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap" role="tablist" aria-label="Что беспокоит">
            {ALL.map((a) => (
              <button
                key={a.id}
                role="tab"
                aria-selected={active === a.id}
                onClick={() => setActive(a.id)}
                className={clsx(
                  'rounded-full px-4 py-2.5 text-left text-[15px] transition-colors lg:rounded-xl',
                  active === a.id ? 'bg-deep text-white shadow-lift' : 'bg-white/80 text-graphite hover:bg-white',
                )}
              >
                {a.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={area.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Panel area={area} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
