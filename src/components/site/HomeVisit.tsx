'use client'

import { openChat } from '@/components/ChatWidget'
import { asset } from '@/lib/asset'

const CASES = [
  'После инсульта, когда маме или отцу трудно выходить из дома',
  'Первые недели после эндопротезирования или перелома',
  'Пожилой родственник почти не встаёт и теряет силы',
]

export function HomeVisit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-10 overflow-hidden rounded-[32px] bg-teal text-white lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-7 sm:p-10 lg:p-12">
          <h2 className="text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[2.8rem]">
            Реабилитолог приедет к вам домой
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
            Если близкому тяжело добраться до центра, специалист осмотрит его дома, покажет упражнения и объяснит семье,
            как помогать между визитами.
          </p>
          <ul className="mt-7 space-y-3">
            {CASES.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime" />
                {c}
              </li>
            ))}
          </ul>
          <div data-reveal className="route mt-8 flex items-center gap-3 text-sm text-white/80">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 font-bold">ОР</span>
            <svg aria-hidden="true" width="150" height="40" viewBox="0 0 150 40" fill="none"><path d="M4 30 C 40 2, 90 2, 146 22" stroke="#F2FF59" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" pathLength="100" /></svg>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-graphite"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg></span>
            <span>центр → ваш дом</span>
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openChat('Нужен реабилитолог на дом для мамы после инсульта')}
              className="h-14 rounded-full bg-lime px-8 text-base font-semibold text-graphite transition hover:bg-white"
            >
              Вызвать реабилитолога
            </button>
            <p className="text-white/70">
              Выезд на дом — <span className="font-semibold text-white">4 000 ₽</span>
            </p>
          </div>
        </div>
        <img
          src={asset('/photos/room.jpg')}
          alt="Кабинет лечебной физкультуры центра"
          loading="lazy"
          className="h-72 w-full object-cover lg:h-full"
        />
      </div>
    </section>
  )
}
