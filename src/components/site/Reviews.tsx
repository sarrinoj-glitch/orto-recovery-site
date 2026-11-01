import { Star } from 'lucide-react'
import { CLINIC } from '@/lib/clinic'

// Только оценки со ссылками на площадки: отзывы и благодарности на сайте — нарушение ч. 3 ст. 24 38-ФЗ
export function Reviews() {
  return (
    <section className="bg-lime-soft">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-24">
      <div className="relative">
        <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
          Оценки центра
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite/65">
          Оценки центра на независимых площадках. Мы отвечаем почти на каждый отзыв.
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
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-[28px] bg-white p-7 shadow-lift">
        <p className="text-xl font-bold text-deep">Почему на сайте нет отзывов</p>
        <p className="text-[15px] leading-relaxed text-graphite/70">Мы не публикуем отзывы и благодарности пациентов на своём сайте — так требует закон о рекламе медицинских услуг. Оценки и все отзывы можно прочитать на независимых площадках по ссылкам: их нельзя удалить или изменить.</p>
        <p className="text-[13px] text-graphite/50">Рейтинги: 2ГИС и Яндекс Карты, данные на октябрь 2026 года.</p>
      </div>
    </div>
    </section>
  )
}
