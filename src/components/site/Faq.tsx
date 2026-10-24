'use client'

// Оформление по мотивам 21st.dev «Animated Line Accordion» (shadcnspace, id 27711):
// открытый вопрос получает подложку и скругления, плюс меняется на минус.
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

const ITEMS = [
  {
    q: 'Нужно ли направление от врача?',
    a: 'Нет. Можно записаться самостоятельно — администратор подскажет, к какому специалисту идти с вашей проблемой.',
  },
  {
    q: 'Сколько процедур понадобится и сколько это будет стоить?',
    a: 'Зависит от того, что покажет осмотр. План лечения и сумму всего курса врач называет на первом приёме, до начала процедур.',
  },
  {
    q: 'Можно оплатить частями?',
    a: 'Да, есть рассрочка без переплат. Условия расскажет администратор.',
  },
  {
    q: 'Колоноскопия — это больно?',
    a: 'Обследование можно пройти под седацией: вы спите и ничего не чувствуете. Перед процедурой пришлём памятку, как подготовиться.',
  },
  {
    q: 'С какого возраста принимаете детей?',
    a: 'Детский массаж делаем с первых месяцев жизни. Гимнастика при сколиозе по методике СИАС и занятия при ДЦП — для детей разного возраста, после консультации.',
  },
  {
    q: 'Можно попасть к специалисту-женщине?',
    a: 'Да. Скажите об этом при записи — подберём специалиста на массаж, ЛФК или приём.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
      <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
        Что обычно спрашивают перед записью
      </h2>

      <div className="overflow-hidden rounded-2xl">
        {ITEMS.map((it, i) => {
          const isOpen = open === i
          return (
            <div
              key={it.q}
              className={cn(
                'bg-ward transition-all duration-500 ease-in-out',
                isOpen && 'rounded-2xl bg-teal-soft',
                isOpen && i > 0 && 'mt-3',
                isOpen && i < ITEMS.length - 1 && 'mb-3',
                open !== null && i === open + 1 && 'rounded-t-2xl',
                open !== null && i === open - 1 && 'rounded-b-2xl',
              )}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[17px] font-medium text-graphite"
                >
                  {it.q}
                  {isOpen ? <Minus size={18} className="shrink-0 text-teal" /> : <Plus size={18} className="shrink-0 text-teal" />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[40rem] px-5 pb-5 text-base leading-relaxed text-graphite/70">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
