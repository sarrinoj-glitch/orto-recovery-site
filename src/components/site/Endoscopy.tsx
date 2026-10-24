'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Moon } from 'lucide-react'
import { openChat } from '@/components/ChatWidget'
import { Waves, HandNote } from '@/components/site/Decor'

const STEPS = [
  { title: 'Памятка заранее', text: 'После записи пришлём, как подготовиться: что можно есть и когда прийти.' },
  { title: 'Вы засыпаете', text: 'Перед обследованием вводят препарат для седации. Это не общий наркоз — вы просто спите.' },
  { title: 'Врач проводит обследование', text: 'Пока вы спите. Гастроскопия и колоноскопия можно сделать за один визит.' },
  { title: 'Просыпаетесь и узнаёте результат', text: 'Врач объясняет, что увидел, и даёт заключение.' },
]

const PRICES = [
  { name: 'Гастроскопия под седацией', price: '6 000 ₽' },
  { name: 'Колоноскопия под седацией', price: '10 000 ₽' },
  { name: 'Оба обследования за один визит', price: '14 000 ₽' },
]

export function Endoscopy() {
  // Линия прогресса шагов рисуется по мере прокрутки
  const olRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: olRef, offset: ['start 80%', 'end 55%'] })
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <section id="endoscopy" className="relative isolate scroll-mt-20 overflow-hidden bg-deep text-white">
      <Waves className="bottom-0 left-0 -z-10 h-44 w-full" opacity={0.35} />
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-neon/10" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-graphite">
            <Moon size={26} className="twinkle" />
          </span>
          <h2 className="mt-6 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Гастроскопия и колоноскопия во сне
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            Многие годами откладывают обследование, потому что страшно. Под седацией вы просто спите и ничего не чувствуете.
            Обследование проводит Куделя Александр Павлович — эндоскопист высшей категории, стаж более 30 лет.
          </p>

          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {PRICES.map((p) => (
              <li key={p.name} className="flex items-baseline justify-between gap-6 py-4">
                <span className="text-white/90">{p.name}</span>
                <span className="shrink-0 text-lg font-semibold tabular-nums">{p.price}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => openChat('Хочу колоноскопию, но боюсь')}
            className="mt-8 h-14 rounded-full bg-lime px-8 text-base font-semibold text-graphite transition hover:bg-white"
          >
            Записаться на обследование
          </button>
          <p className="mt-4 text-sm text-white/60">Есть противопоказания, необходима консультация специалиста.</p>
        </div>

        <ol ref={olRef} data-stagger className="relative space-y-7 rounded-[28px] bg-white/5 p-6 ring-1 ring-white/10 sm:p-8 lg:mt-3">
          <span aria-hidden="true" className="absolute bottom-12 left-[calc(3rem-1px)] top-12 w-0.5 overflow-hidden rounded bg-white/10 sm:left-[calc(3.5rem-1px)]"><motion.span className="block h-full w-full origin-top bg-neon" style={{ scaleY: prog }} /></span>
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E4D5D] text-lg font-bold text-neon ring-2 ring-neon/40">
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-semibold">{s.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-white/75">{s.text}</p>
              </div>
            </li>
          ))}
          <HandNote className="-bottom-12 right-4 hidden lg:flex" arrow="none" color="text-lime">памятку по подготовке пришлём в WhatsApp</HandNote>
        </ol>
      </div>
    </section>
  )
}
