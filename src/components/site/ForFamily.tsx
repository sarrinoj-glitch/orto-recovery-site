import { Baby, Dumbbell, HeartHandshake, Accessibility } from 'lucide-react'

const GROUPS = [
  {
    icon: Baby,
    title: 'Детям',
    text: 'Массаж с первых месяцев жизни, гимнастика при сколиозе по методике СИАС, занятия при ДЦП, детские стельки.',
    tone: 'bg-coral-soft',
    iconTone: 'bg-coral text-white',
  },
  {
    icon: Dumbbell,
    title: 'Спортсменам',
    text: 'Восстановление после травм связок и мениска, ударно-волновая терапия, тейпирование, программа возвращения к тренировкам.',
    tone: 'bg-lagoon',
    iconTone: 'bg-teal text-white',
  },
  {
    icon: HeartHandshake,
    title: 'Женщинам',
    text: 'По вашему желанию подберём специалиста-женщину — на массаж, ЛФК или приём.',
    tone: 'bg-lime-soft',
    iconTone: 'bg-lime text-graphite',
  },
  {
    icon: Accessibility,
    title: 'Родителям в возрасте',
    text: 'Пандус и парковка у входа, первый этаж. Реабилитолог может приехать на дом — 4 000 ₽.',
    tone: 'bg-teal-soft',
    iconTone: 'bg-deep text-white',
  },
]

export function ForFamily() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <h2 className="max-w-xl text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl">
        Записывают сюда всю семью
      </h2>
      <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map(({ icon: Icon, title, text, tone, iconTone }, i) => (
          <div key={title} className={`lift rounded-[28px] p-6 ${tone} ${i % 2 === 1 ? 'lg:mt-8' : ''}`}>
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconTone}`}>
              <Icon size={22} />
            </span>
            <p className="mt-5 text-xl font-semibold text-graphite">{title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
