'use client'

import { openChat } from '@/components/ChatWidget'

// Скидки — из материалов клиники (Яндекс Бизнес, архив сайта); суммы посчитаны от прайса ПроДокторов 19.10.2026
const COURSES = [
  {
    title: 'Гимнастика при сколиозе по методике СИАС',
    terms: 'Курс из 10 индивидуальных занятий',
    discount: '−20%',
    old: '25 000 ₽',
    now: '20 000 ₽',
    chat: 'Здравствуйте, хочу курс гимнастики СИАС со скидкой для ребёнка',
    tone: 'bg-lagoon',
  },
  {
    title: 'Общий массаж',
    terms: 'Курс из 5 сеансов',
    discount: '−10%',
    old: '17 500 ₽',
    now: '15 750 ₽',
    chat: 'Здравствуйте, хочу курс массажа из 5 сеансов',
    tone: 'bg-coral-soft',
  },
]

export function Savings() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <h2 className="max-w-2xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
        Как сэкономить на лечении
      </h2>

      <div data-stagger className="mt-10 grid gap-5 lg:grid-cols-2">
        {COURSES.map((c) => (
          <div key={c.title} className={`flex flex-col justify-between gap-6 rounded-[28px] p-6 sm:p-8 ${c.tone}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-semibold tracking-[-0.01em] text-graphite">{c.title}</p>
                <p className="mt-1 text-[15px] text-graphite/60">{c.terms}</p>
              </div>
              <span className="wobble flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-lime text-2xl font-extrabold text-graphite shadow-lift">{c.discount}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p>
                <span className="strike relative mr-3 inline-block text-graphite/45">{c.old}<svg aria-hidden="true" className="absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none"><line x1="0" y1="7" x2="100" y2="3" stroke="#C2563A" strokeWidth="2.5" pathLength="100" /></svg></span>
                <span className="text-3xl font-extrabold tracking-[-0.03em] text-graphite">{c.now}</span>
              </p>
              <button
                type="button"
                onClick={() => openChat(c.chat)}
                className="h-12 rounded-full bg-graphite px-6 text-[15px] font-semibold text-white transition hover:bg-black"
              >
                Записаться на курс
              </button>
            </div>
          </div>
        ))}
      </div>

      <div data-stagger className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[28px] bg-deep p-6 text-white sm:p-8">
          <p className="text-xl font-semibold">Рассрочка без переплат</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            Курс можно оплатить частями, без переплаты. Условия и сроки подскажет администратор.
          </p>
        </div>
        <div className="rounded-[28px] bg-lime-soft p-6 sm:p-8">
          <p className="text-xl font-semibold text-graphite">Налоговый вычет — до 19 500 ₽ в год</p>
          <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">
            Государство возвращает 13% расходов на лечение. Например, с курса за 20 000 ₽ вернётся 2 600 ₽. Справку для налоговой
            выдадим по запросу.
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-graphite/50">Условия акций уточняйте у администратора.</p>
    </section>
  )
}
