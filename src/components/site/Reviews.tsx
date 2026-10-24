import { Star } from 'lucide-react'
import { CLINIC } from '@/lib/clinic'
import { HandNote } from '@/components/site/Decor'

// Отзывы показываем официальными виджетами и ссылками на площадки, без цитат на сайте
export function Reviews() {
  return (
    <section className="bg-lime-soft">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-24">
      <div className="relative">
        <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
          Что пишут пациенты
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite/65">
          Отзывы живут на независимых площадках — их нельзя удалить или поправить. Мы отвечаем почти на каждый.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={CLINIC.rating2gis.url}
            target="_blank"
            rel="noreferrer"
            className="spot lift flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19AA1E] text-sm font-extrabold text-white" aria-hidden>2Г</span>
              <span>
              <span className="block font-semibold text-graphite">2ГИС</span>
              <span className="text-[15px] text-graphite/60">{CLINIC.rating2gis.count} оценка</span>
              </span>
            </span>
            <span className="flex items-center gap-2 text-3xl font-extrabold tracking-[-0.03em] text-graphite">
              <Star size={22} className="fill-lime stroke-graphite" />
              {CLINIC.rating2gis.value}
            </span>
          </a>
          <a
            href={CLINIC.ratingYandex.url}
            target="_blank"
            rel="noreferrer"
            className="spot lift flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FC3F1D] text-lg font-extrabold text-white" aria-hidden>Я</span>
              <span>
              <span className="block font-semibold text-graphite">Яндекс Карты</span>
              <span className="text-[15px] text-graphite/60">все отзывы на карте</span>
              </span>
            </span>
            <span className="flex items-center gap-2 text-3xl font-extrabold tracking-[-0.03em] text-graphite">
              <Star size={22} className="fill-lime stroke-graphite" />
              {CLINIC.ratingYandex.value}
            </span>
          </a>
        </div>
        <HandNote className="-bottom-16 left-6 hidden lg:flex" arrow="down-right" color="text-deep">живые отзывы прямо с Яндекс Карт</HandNote>
      </div>

      <iframe
        title="Отзывы о центре «Орто-Рекавери» на Яндекс Картах"
        src={CLINIC.reviewsWidget}
        loading="lazy"
        className="h-[560px] w-full rounded-[24px] bg-white shadow-lift"
      />
    </div>
    </section>
  )
}
