'use client'

import { DOCTORS } from '@/lib/clinic'
import { openChat } from '@/components/ChatWidget'

const TONES = ['bg-teal text-white', 'bg-lime text-graphite', 'bg-deep text-white', 'bg-coral-soft text-graphite', 'bg-lagoon-deep text-graphite', 'bg-teal-soft text-teal-dark']
const initials = (n: string) => n.split(' ').slice(0, 2).map((w) => w[0]).join('')

export function Doctors() {
  return (
    <section id="doctors" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
          Врачи, к которым приходят по имени
        </h2>
        <p className="max-w-md text-lg text-graphite/65 lg:justify-self-end">
          Можно записаться к конкретному врачу. Если вам спокойнее со специалистом-женщиной, скажите об этом администратору.
        </p>
      </div>

      <ul data-stagger className="mt-10 border-t border-graphite/10">
        {DOCTORS.map((d, i) => (
          <li
            key={d.name}
            className="grid gap-3 rounded-2xl border-b border-graphite/10 px-2 py-6 transition-colors hover:bg-ward/70 md:grid-cols-[1.25fr_1.35fr_auto] md:items-center md:gap-8 md:px-4"
          >
            <div className="flex items-center gap-4">
              {d.photo ? (
                <img src={d.photo} alt="" className="h-14 w-14 shrink-0 rounded-2xl object-cover object-[50%_20%]" />
              ) : (
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${TONES[i % TONES.length]}`} aria-hidden>
                  {initials(d.name)}
                </span>
              )}
              <div>
                <p className="text-xl font-semibold tracking-[-0.01em] text-graphite">{d.name}</p>
                <p className="mt-1 text-[15px] text-graphite/60">{d.role}</p>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-graphite/80">{d.treats}</p>
            <div className="flex items-center justify-between gap-5 md:justify-end">
              <span className="whitespace-nowrap font-semibold tabular-nums text-graphite">{d.price}</span>
              <button
                type="button"
                onClick={() => openChat(d.chat)}
                className="h-11 whitespace-nowrap rounded-full border border-teal px-5 text-[15px] font-medium text-teal transition hover:bg-teal hover:text-white"
              >
                Записаться
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
