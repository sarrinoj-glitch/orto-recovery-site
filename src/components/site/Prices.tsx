'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { PRICE_GROUPS } from '@/lib/clinic'

export function Prices() {
  const [tab, setTab] = useState(0)
  const group = PRICE_GROUPS[tab]

  return (
    <section id="prices" className="scroll-mt-20 bg-deep-2 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
        <div>
          <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Цены</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/70">
            Сумму всего курса врач называет на первом приёме, до начала процедур. Если нужно, оформим рассрочку без переплат.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start" role="tablist" aria-label="Разделы прайса">
            {PRICE_GROUPS.map((g, i) => (
              <button
                key={g.title}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={clsx(
                  'relative rounded-full px-4 py-2.5 text-[15px] transition-colors',
                  tab === i ? 'font-semibold text-graphite' : 'bg-white/10 text-white hover:bg-white/20',
                )}
              >
                {/* Скользящая подложка активной вкладки (приём из 21st.dev Animated Tabs) */}
                {tab === i && (
                  <motion.span
                    layoutId="price-tab"
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative">{g.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <ul key={group.title} className="divide-y divide-white/10 border-y border-white/10">
            {group.items.map((it) => (
              <li key={it.name} className="flex items-baseline gap-4 py-4 text-base">
                <span className="text-white/85">{it.name}</span>
                <span aria-hidden className="min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-white/25" />
                <span className="shrink-0 font-semibold tabular-nums">{it.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/45">
            Цены по прайсу центра на ПроДокторов от 19.10.2026. Имеются противопоказания, необходима консультация специалиста.
          </p>
        </div>
      </div>
    </section>
  )
}
