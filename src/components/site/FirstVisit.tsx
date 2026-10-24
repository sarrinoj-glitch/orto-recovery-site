import { HandNote } from '@/components/site/Decor'

const STEPS = [
  { title: 'Записываетесь', text: 'В чате на сайте, по телефону или в WhatsApp. Администратор подскажет, к какому врачу идти.' },
  { title: 'Берёте с собой снимки', text: 'МРТ, рентген, выписки после операции — всё, что есть. Если нет, ничего страшного.' },
  { title: 'Врач осматривает и объясняет', text: 'Что происходит, почему болит и какие есть варианты лечения.' },
  { title: 'Получаете план и сумму', text: 'До начала процедур вы знаете, сколько стоит весь курс. Решение за вами.' },
]

const TONES = ['bg-lagoon text-teal-dark', 'bg-lime text-graphite', 'bg-coral-soft text-graphite', 'bg-teal text-white']

export function FirstVisit() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <HandNote className="right-6 top-20 hidden lg:flex" arrow="down-left" color="text-coral">не забудьте снимки и МРТ!</HandNote>
      <h2 className="max-w-xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
        Как проходит первый визит
      </h2>
      <ol data-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span className={`flex h-16 w-16 items-center justify-center rounded-[20px] text-3xl font-extrabold tracking-[-0.04em] ${TONES[i]}`}>{i + 1}</span>
            <p className="mt-4 text-lg font-semibold text-graphite">{s.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite/65">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
