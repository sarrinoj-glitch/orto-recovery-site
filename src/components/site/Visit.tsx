'use client'

import { CLINIC } from '@/lib/clinic'
import { openChat } from '@/components/ChatWidget'
import { HandNote } from '@/components/site/Decor'

export function Visit() {
  const tel = CLINIC.phone.replace(/[^\d+]/g, '')
  return (
    <section id="visit" className="scroll-mt-20 mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
      <div>
        <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">Как добраться</h2>
        <p className="mt-6 text-xl font-semibold text-graphite">{CLINIC.address}</p>
        <p className="mt-3 max-w-md text-[17px] leading-relaxed text-graphite/70">{CLINIC.howToFind}</p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-graphite/10 pt-6">
          <div>
            <dt className="text-sm text-graphite/55">Часы работы</dt>
            <dd className="mt-1 font-semibold text-graphite">
              {CLINIC.hoursWeek}
              <br />
              {CLINIC.hoursSat}
              <br />
              <span className="font-normal text-graphite/60">Вс: выходной</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-graphite/55">Телефон</dt>
            <dd className="mt-1">
              <a href={`tel:${tel}`} className="font-semibold text-graphite underline-offset-4 hover:underline">
                {CLINIC.phone}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openChat()}
            className="h-12 rounded-full bg-teal px-6 text-[15px] font-medium text-white transition hover:bg-teal-dark"
          >
            Записаться онлайн
          </button>
          <a
            href={CLINIC.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-graphite/15 px-6 text-[15px] font-medium text-graphite transition hover:border-graphite/40"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>

      <div className="relative">
      <HandNote className="-top-10 right-6 z-10 hidden lg:flex" arrow="down-right" color="text-coral">мы здесь, рядом с «Тарнаиром»</HandNote>
      <span className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-graphite shadow-lift"><span className="relative flex h-2.5 w-2.5"><span className="pin-pulse absolute inset-0 rounded-full bg-coral" /><span className="relative h-2.5 w-2.5 rounded-full bg-coral" /></span>Проспект Имама Шамиля, 35А</span>
      <iframe
        title="Карта: Орто-Рекавери на проспекте Имама Шамиля, 35А"
        src={CLINIC.mapEmbed}
        loading="lazy"
        className="h-[360px] w-full rounded-[24px] border-[6px] border-lagoon bg-ward shadow-lift lg:h-full lg:min-h-[440px]"
      />
      </div>
    </section>
  )
}
