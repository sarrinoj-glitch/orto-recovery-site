'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import { openChat } from '@/components/ChatWidget'

// Нейтральные описания методов, без обещаний результата (требования к медицинской рекламе)
const PROCEDURES = [
  {
    id: 'prp',
    name: 'PRP-терапия',
    what: 'У вас берут немного крови, отделяют плазму с тромбоцитами и вводят её в сустав или область связки.',
    when: 'Её назначают при артрозе, после травм связок и сухожилий.',
    session: 'Забор крови и введение плазмы — за один визит.',
    price: '10 500 ₽',
    chat: 'Здравствуйте, интересует PRP-терапия колена',
  },
  {
    id: 'uvt',
    name: 'Ударно-волновая терапия',
    what: 'Аппарат передаёт акустические импульсы через кожу в область боли — без уколов и разрезов.',
    when: 'Её применяют при пяточной шпоре, боли в плече и локте, хронической боли в спине.',
    session: 'Сеанс короткий, обычно назначают курс из нескольких процедур.',
    price: '3 000 ₽',
    chat: 'Здравствуйте, интересует ударно-волновая терапия, болит пятка',
  },
  {
    id: 'mvi',
    name: 'Магнит высокой интенсивности',
    what: 'Сильное магнитное поле воздействует на мышцы и нервы. Вы лежите или сидите, ощущения — подёргивание мышц.',
    when: 'Его используют при боли в спине и суставах, для восстановления мышц.',
    session: 'Можно совместить с лазером в одном сеансе.',
    price: '2 000 ₽',
    chat: 'Здравствуйте, интересует магнитотерапия высокой интенсивности',
  },
  {
    id: 'seas',
    name: 'Гимнастика СИАС',
    what: 'Индивидуальные упражнения по итальянской методике, которые учат держать позвоночник правильно в обычной жизни.',
    when: 'Подходит детям и взрослым при сколиозе и нарушениях осанки.',
    session: 'Занятие — с инструктором, упражнения потом можно делать дома.',
    price: '2 500 ₽',
    chat: 'Здравствуйте, у ребёнка сколиоз, интересует гимнастика СИАС',
  },
  {
    id: 'insoles',
    name: 'Стельки Formthotics',
    what: 'Стельки из термоформуемого материала, которые подгоняют под вашу стопу прямо на приёме.',
    when: 'Их подбирают при плоскостопии, боли в пятке, быстрой усталости ног.',
    session: 'Подбор и формовка — за один визит.',
    price: '13 500 ₽',
    chat: 'Здравствуйте, хочу подобрать стельки Formthotics',
  },
]

export function Procedures() {
  const [active, setActive] = useState('prp')
  const reduce = useReducedMotion()
  const p = PROCEDURES.find((x) => x.id === active) ?? PROCEDURES[0]

  return (
    <section id="procedures" className="scroll-mt-24 bg-coral-soft/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
          Что это за процедура
        </h2>
        <p className="mt-4 max-w-xl text-lg text-graphite/65">Простыми словами о методах, которые чаще всего назначают наши врачи.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Процедуры">
            {PROCEDURES.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={active === x.id}
                onClick={() => setActive(x.id)}
                className={clsx(
                  'shrink-0 rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-colors',
                  active === x.id ? 'bg-white text-graphite shadow-lift' : 'text-graphite/65 hover:bg-white/60 hover:text-graphite',
                )}
              >
                {x.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-[24px] bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-graphite">{p.name}</h3>
                <span className="text-xl font-semibold tabular-nums text-graphite">{p.price}</span>
              </div>
              <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="inline-block rounded-full bg-lagoon px-3 py-1 text-sm font-semibold text-teal-dark">Что это</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-graphite/80">{p.what}</dd>
                </div>
                <div>
                  <dt className="inline-block rounded-full bg-lime-soft px-3 py-1 text-sm font-semibold text-graphite">Когда назначают</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-graphite/80">{p.when}</dd>
                </div>
                <div>
                  <dt className="inline-block rounded-full bg-coral-soft px-3 py-1 text-sm font-semibold text-graphite">Как проходит</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-graphite/80">{p.session}</dd>
                </div>
              </dl>
              <div className="mt-7 flex flex-col gap-3 border-t border-graphite/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-graphite/50">Подходит ли метод вам, решает врач после осмотра.</p>
                <button
                  type="button"
                  onClick={() => openChat(p.chat)}
                  className="h-11 rounded-full bg-teal px-5 text-[15px] font-medium text-white transition hover:bg-teal-dark"
                >
                  Спросить у администратора
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
