'use client'

import { useState } from 'react'
import { Check, Info, Syringe } from 'lucide-react'
import { openChat } from '@/components/ChatWidget'
import { METHODS, TWIN_PLANS } from '@/lib/content'
import { asset } from '@/lib/asset'

const H2 = 'text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl'

// «Один диагноз — две программы»: персональная траектория со старого сайта
export function TwinPlans() {
  const [k, setK] = useState<keyof typeof TWIN_PLANS>('a')
  const t = TWIN_PLANS[k]
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className={H2}>Один диагноз — две разные программы</h2>
      <div data-reveal className="mt-8 rounded-[32px] bg-white p-5 shadow-soft ring-1 ring-graphite/5 sm:p-7">
        <div role="group" aria-label="Пациент" className="flex gap-1 rounded-full bg-ward p-1 sm:inline-flex">
          {(Object.keys(TWIN_PLANS) as (keyof typeof TWIN_PLANS)[]).map((key) => (
            <button key={key} type="button" aria-pressed={k === key} onClick={() => setK(key)}
              className={`h-11 flex-1 rounded-full px-4 text-sm font-semibold transition sm:flex-none sm:px-5 sm:text-[15px] ${k === key ? 'bg-deep text-white' : 'text-deep'}`}>
              {TWIN_PLANS[key].tab}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-ward p-5">
            <span className="rounded-full bg-[#E2553A] px-3 py-1 text-[13px] font-semibold text-white">Грыжа диска L5–S1</span>
            <p className="mt-3 text-xl font-bold text-deep">{t.tab}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite/65">{t.why}</p>
            <p className="mt-4 text-[13px] text-graphite/55">Нагрузка в программе</p>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-teal-soft">
              <div className="h-full rounded-full bg-gradient-to-r from-neon to-lime transition-all duration-500" style={{ width: `${t.load}%` }} />
            </div>
          </div>
          <ol key={k} className="space-y-2.5">
            {t.plan.map(([w, x]) => (
              <li key={w} className="grid gap-1 rounded-2xl bg-ward px-4 py-3.5 sm:grid-cols-[100px_1fr] sm:gap-4">
                <span className="text-[13px] font-bold text-teal">{w}</span>
                <span className="text-[15px] leading-relaxed">{x}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-[13px] text-graphite/55">Условный пример, чтобы показать принцип. Программу составляет врач после осмотра — для одного она может быть слишком лёгкой, для другого невыполнимой.</p>
      </div>
    </section>
  )
}

// Словарь из 23 методик старого сайта
export function Glossary() {
  const [m, setM] = useState<string | null>(null)
  const cur = METHODS.find((x) => x.name === m)
  return (
    <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
      <p className="text-lg font-semibold text-graphite">Все 23 методики центра — нажмите, чтобы узнать, что это:</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {METHODS.map((x) => (
          <button key={x.name} type="button" aria-pressed={m === x.name} onClick={() => setM(x.name)}
            className={`rounded-full border px-3.5 py-2 text-sm transition ${m === x.name ? 'border-deep bg-deep text-white' : 'border-teal-soft bg-white text-deep hover:border-teal'}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-4 flex min-h-[86px] gap-4 rounded-3xl bg-deep p-5 text-white">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime"><Info size={20} /></span>
        <div>
          <p className="font-semibold text-lime">{cur ? cur.name : 'Словарь методик'}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-white/85">{cur ? cur.text : 'Нажмите на любую методику выше — коротко расскажем, что это такое.'}</p>
        </div>
      </div>
    </section>
  )
}

// PRP за три шага (страница PRP старого сайта)
export function PrpSteps() {
  const steps = [
    { img: '/photos/g-blood.jpg', alt: 'Подготовка к забору крови в процедурном кабинете', title: 'Забор крови', text: 'Берём кровь из вены — так же, как на обычном анализе.' },
    { img: '/photos/g-lab.jpg', alt: 'Медсёстры работают с пробирками', title: 'Приготовление плазмы', text: 'Кровь центрифугируют и получают плазму, обогащённую тромбоцитами.' },
    { img: '', alt: '', title: 'Введение', text: 'Врач-ортопед вводит плазму в зону повреждения под местной анестезией.' },
  ]
  return (
    <section id="prp" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className={H2}>PRP-терапия за три шага</h2>
      <div data-stagger className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <article key={s.title} className="overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-graphite/5">
            <div className="relative h-52">
              {s.img ? <img src={asset(s.img)} alt={s.alt} className="h-full w-full object-cover" />
                : <div className="flex h-full items-center justify-center bg-gradient-to-br from-lagoon to-lime-soft text-deep"><Syringe size={72} strokeWidth={1.3} /></div>}
              <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime text-lg font-extrabold">{i + 1}</span>
            </div>
            <div className="p-5">
              <p className="text-lg font-semibold text-deep">{s.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-graphite/65">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5 text-sm text-deep">
        {[['Обезболивание', 'местная анестезия'], ['Делает', 'врач-ортопед'], ['Курс', '3–5 инъекций'], ['Стоимость', '10 500 ₽']].map(([a, b]) => (
          <span key={a} className="rounded-full bg-white px-4 py-2 shadow-card">{a}: <b className="text-teal">{b}</b></span>
        ))}
        <button type="button" onClick={() => openChat('Здравствуйте, интересует PRP-терапия сустава')} className="rounded-full bg-deep px-5 py-2 font-semibold text-white">Спросить про PRP</button>
      </div>
    </section>
  )
}

// «Не только сустав»: нутрициолог, психолог, терапевт и анализы (прайс ПроДокторов)
export function Whole() {
  const items = [
    { t: 'Эндокринолог-нутрициолог', d: 'План питания на время восстановления и контроль веса — лишние килограммы нагружают суставы.', p: '4 000 ₽', tone: 'bg-lime-soft', chat: 'Здравствуйте, хочу к нутрициологу' },
    { t: 'Психолог', d: 'Страх движения после травмы, хроническая боль и стресс мешают восстановиться не меньше, чем сама травма.', p: '3 000 ₽', tone: 'bg-lagoon', chat: 'Здравствуйте, хочу записаться к психологу' },
    { t: 'Терапевт и анализы', d: 'Терапевт-гастроэнтеролог и лабораторные анализы — всё в одном центре, без поездок по городу.', p: 'от 595 ₽', tone: 'bg-coral-soft', chat: 'Здравствуйте, хочу сдать анализы' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className={H2}>Восстановление — это ещё питание и голова</h2>
      <div data-stagger className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((x) => (
          <button key={x.t} type="button" onClick={() => openChat(x.chat)} className={`lift flex min-h-[230px] flex-col justify-between gap-5 rounded-[28px] p-6 text-left ${x.tone}`}>
            <span><span className="block text-xl font-bold text-deep">{x.t}</span><span className="mt-2 block text-[15px] leading-relaxed text-graphite/75">{x.d}</span></span>
            <span className="text-2xl font-extrabold text-deep">{x.p}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function Sport() {
  return (
    <section id="sport" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div data-reveal className="relative isolate flex min-h-[480px] items-end overflow-hidden rounded-[36px] text-white">
        <img src={asset('/photos/sport.jpg')} alt="Борцы на ковре во время схватки" className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_40%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/80 to-deep/10 lg:bg-gradient-to-r lg:from-deep lg:via-deep/75 lg:to-transparent" />
        <div className="max-w-xl p-7 pt-48 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">Спортивная реабилитация</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Вернуться на ковёр после травмы</h2>
          <p className="mt-4 text-lg text-white/80">Выстроенная программа восстановления для спортсменов: без осложнений и с быстрым возвратом к привычным тренировкам.</p>
          <ul className="mt-6 space-y-2.5 font-semibold">
            {['Полная подвижность в суставе', 'Сила травмированного участка', 'Психологическая готовность к нагрузкам'].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime text-graphite"><Check size={14} strokeWidth={3} /></span>{t}</li>
            ))}
          </ul>
          <button type="button" onClick={() => openChat('Здравствуйте, я спортсмен, нужна реабилитация после травмы')} className="mt-7 h-14 rounded-full bg-lime px-7 font-semibold text-graphite transition hover:-translate-y-0.5">Записаться на реабилитацию</button>
        </div>
      </div>
    </section>
  )
}
