'use client'

import { useState } from 'react'
import { openChat } from '@/components/ChatWidget'
import { CONDITIONS, AFTER_COURSE } from '@/lib/content'
import { asset } from '@/lib/asset'
import { Check } from 'lucide-react'

// Список заболеваний со старого сайта, по зонам (идея Biruev)
export function Conditions() {
  const [tab, setTab] = useState(CONDITIONS[0].id)
  const cur = CONDITIONS.find((c) => c.id === tab) ?? CONDITIONS[0]
  return (
    <section id="conditions" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className="max-w-3xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">Травмы и заболевания, которые мы лечим</h2>
      <div data-reveal className="mt-8 rounded-[32px] bg-white p-5 shadow-soft ring-1 ring-graphite/5 sm:p-7">
        <div role="tablist" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {CONDITIONS.map((c) => (
            <button key={c.id} role="tab" aria-selected={tab === c.id} type="button" onClick={() => setTab(c.id)}
              className={`h-11 shrink-0 rounded-full px-5 text-[15px] font-semibold transition ${tab === c.id ? 'bg-deep text-white' : 'bg-ward text-deep hover:bg-lagoon'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <ul className="mt-6 gap-8 sm:columns-2 lg:columns-3">
          {cur.items.map((it) => (
            <li key={it} className="relative break-inside-avoid border-b border-graphite/5 py-2.5 pl-6 text-base">
              <span className="absolute left-1 top-[18px] h-2.5 w-2.5 rounded-full bg-[#E2553A] shadow-[0_0_0_4px_rgba(226,85,58,0.15)]" />
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[15px] text-graphite/60">
          <span>Не нашли свой диагноз? Напишите — администратор подскажет, к какому врачу идти.</span>
          <button type="button" onClick={() => openChat('Здравствуйте, не нашёл свой диагноз в списке, подскажите, к какому врачу идти')} className="h-12 rounded-full bg-deep px-6 font-semibold text-white">Спросить администратора</button>
        </div>
      </div>
    </section>
  )
}

// «Вам предложили операцию?» — оффер второго мнения
export function SecondOpinion() {
  return (
    <section id="second" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div data-reveal className="grid overflow-hidden rounded-[36px] bg-coral-soft lg:grid-cols-2">
        <img src={asset('/photos/g-ortho.jpg')} alt="Травматолог-ортопед центра за рабочим столом" className="h-64 w-full object-cover object-[40%_40%] lg:h-full lg:min-h-[420px]" />
        <div className="flex flex-col justify-center p-7 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C2563A]">Второе мнение</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#4a1f12] sm:text-[2.6rem]">Вам предложили операцию? Сначала покажитесь нам</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#5b3a30]">Бывает, что от операции можно отказаться — если вовремя начать физиотерапию и ЛФК. Ортопед посмотрит ваши снимки и честно скажет, есть ли смысл пробовать без операции.</p>
          <ul className="mt-5 space-y-2 text-[#4a1f12]">
            {['Возьмите снимки МРТ и заключения', 'Врач разберёт их на приёме', 'Если операция нужна — так и скажем'].map((t) => <li key={t} className="flex gap-3"><span className="font-bold text-[#C2563A]">→</span>{t}</li>)}
          </ul>
          <button type="button" onClick={() => openChat('Здравствуйте, мне предложили операцию, хочу второе мнение ортопеда')} className="mt-7 h-14 self-start rounded-full bg-[#C2563A] px-7 font-semibold text-white transition hover:-translate-y-0.5">Записаться на консультацию — 3 000 ₽</button>
        </div>
      </div>
    </section>
  )
}

export function AfterCourse() {
  const tones = ['bg-lagoon', 'bg-lime', 'bg-coral-soft', 'bg-lime-soft', 'bg-white ring-1 ring-graphite/10', 'bg-teal-soft']
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">После курса лечения вы сможете</h2>
      <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AFTER_COURSE.map((t, i) => (
          <li key={t} className={`flex gap-4 rounded-3xl p-6 text-lg font-semibold leading-snug text-deep ${tones[i]}`}><Check className="mt-0.5 shrink-0" size={22} />{t}</li>
        ))}
      </ul>
    </section>
  )
}
