'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { GraduationCap, Play } from 'lucide-react'
import { openChat } from '@/components/ChatWidget'
import { asset } from '@/lib/asset'

const H2 = 'text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-graphite sm:text-5xl'

// Пометка для того, что должна дать клиника (данные не придумываем)
function NeedTag() {
  return <span className="self-start rounded-full bg-graphite px-2.5 py-1 text-xs font-bold text-lime">нужно от клиники</span>
}

const BUBBLES: { me?: boolean; text: string; card?: string; time: string }[] = [
  { text: 'Здравствуйте, Магомед! Напоминаем: завтра в 10:00 ударно-волновая терапия, кабинет 3. Подтвердите, пожалуйста', time: '19:02' },
  { me: true, text: 'Да, буду', time: '19:05' },
  { text: 'Записали. Вход за шлагбаумом, рядом санаторий «Тарнаир», есть парковка', time: '19:05' },
  { text: 'Упражнения на сегодня от врача:', card: 'ЛФК дома · 3 упражнения · 15 минут — ▶ Смотреть видео', time: '12:40' },
  { me: true, text: 'После второго упражнения тянет поясницу, это нормально?', time: '18:11' },
  { text: 'Передали ваш вопрос врачу — он ответит сегодня до 20:00', time: '18:11' },
  { text: '', card: 'Ваш курс: 4 из 10 процедур · следующая — четверг, 10:00', time: '18:12' },
]

// «План лечения в WhatsApp» (Hinge «Your care, connected») — показывает, как работает ИИ-администратор
export function WhatsAppPlan() {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(BUBBLES.length); return }
    let timer: ReturnType<typeof setInterval> | undefined
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      timer = setInterval(() => setShown((n) => { if (n >= BUBBLES.length) { clearInterval(timer); return n } return n + 1 }), 700)
    }, { threshold: 0.3 })
    io.observe(el)
    return () => { io.disconnect(); if (timer) clearInterval(timer) }
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="relative grid gap-10 overflow-hidden rounded-[36px] bg-deep p-6 text-white sm:p-12 lg:grid-cols-[1fr_340px] lg:items-center">
        <span className="absolute right-12 top-6 hidden text-xs text-white/50 lg:block">пример: так работает ИИ-администратор</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neon">Лечение не заканчивается в кабинете</p>
          <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Ваш план лечения — в WhatsApp</h2>
          <p className="mt-4 text-lg text-white/80">Между визитами центр остаётся на связи: напомнит о процедуре, пришлёт упражнения от врача и передаст ваш вопрос — без звонков и ожидания на линии.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[['Напоминания', 'о процедурах накануне — с адресом и кабинетом'], ['Упражнения на дом', 'видео от врача после каждого занятия'], ['Вопрос врачу', 'без звонка — ответ в тот же день'], ['Прогресс курса', 'сколько процедур пройдено и что дальше']].map(([a, b]) => (
              <li key={a} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[15px]"><b className="block text-lime">{a}</b>{b}</li>
            ))}
          </ul>
          <button type="button" onClick={() => openChat('Здравствуйте, хочу записаться на приём')} className="mt-7 h-14 rounded-full bg-lime px-7 font-semibold text-graphite transition hover:-translate-y-0.5">Написать администратору</button>
        </div>
        <div ref={ref} className="mx-auto w-[290px] rounded-[44px] bg-black p-3 shadow-lift sm:w-[320px]">
          <div className="flex h-[540px] flex-col overflow-hidden rounded-[34px] bg-[#ECE5DD]">
            <div className="flex items-center gap-2.5 bg-[#075E54] px-4 pb-3 pt-7">
              <img src={asset('/logo-dark.png')} alt="" className="h-8 w-8 rounded-full bg-white object-contain p-0.5" />
              <div className="leading-tight"><b className="text-[15px]">Орто-Рекавери</b><br /><span className="text-xs opacity-80">онлайн</span></div>
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5 text-[13px] leading-snug text-[#111]">
              {BUBBLES.map((b, i) => (
                <div key={i} className={`max-w-[85%] rounded-xl px-2.5 py-2 shadow-sm transition duration-500 ${b.me ? 'self-end rounded-br-sm bg-[#DCF8C6]' : 'rounded-bl-sm bg-white'} ${i < shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                  {b.text}
                  {b.card && <div className="mt-1.5 rounded-lg bg-[#F3F7F7] p-2 text-xs text-[#075E54]">{b.card}</div>}
                  <span className="mt-0.5 block text-right text-[10px] text-[#8a8a8a]">{b.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Основатель и директор (выгрузка старого сайта) + семинары для врачей
export function Founders() {
  const people = [
    { img: '/photos/p-founder.jpg', name: 'Магомеддов Абдулла-Гаджи Абумуслимович', role: 'Основатель проекта «Орто-Рекавери»', need: '2–3 фразы: почему открыли центр и чем он отличается.' },
    { img: '/photos/p-director.jpg', name: 'Хумаров Артур Рамазанович', role: 'Генеральный директор', need: 'Обращение к пациентам — коротко, от первого лица.' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div data-reveal className="flex items-center gap-4 rounded-3xl bg-lime p-5 sm:px-7">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/60"><GraduationCap size={22} /></span>
        <p className="text-[15px] leading-relaxed sm:text-base"><b>Центр учит других врачей.</b> Павел Куделя проводит здесь авторские семинары по сухим иглам для специалистов, в центре проходил семинар KinesioCourse по кинезиотейпированию.</p>
      </div>
      <h2 className={`${H2} mt-16`}>Кто за этим стоит</h2>
      <div data-stagger className="mt-8 grid gap-4 lg:grid-cols-2">
        {people.map((p) => (
          <article key={p.name} className="grid grid-cols-[96px_1fr] items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft ring-1 ring-graphite/5 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-5">
            <img src={asset(p.img)} alt={p.name} className="h-[120px] w-24 rounded-2xl object-cover object-[50%_15%] sm:h-[180px] sm:w-[150px]" />
            <div>
              <p className="text-lg font-bold leading-tight text-deep sm:text-xl">{p.name}</p>
              <p className="mt-1 text-sm font-semibold text-teal">{p.role}</p>
              <div className="mt-3 flex flex-col gap-1.5 rounded-2xl border-2 border-dashed border-teal/40 p-3"><NeedTag /><p className="text-[13px] text-graphite/60">{p.need}</p></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Guarantees() {
  const items = [
    ['Доказательная медицина', 'Применяем методы, доказавшие свою эффективность и безопасность.'],
    ['Лицензия Минздрава', 'Зарегистрированное медицинское учреждение с необходимыми лицензиями.'],
    ['Без операций', 'Осторожный подход: только безоперационные методы восстановления.'],
    ['Консилиум врачей', 'В сложных случаях вас посмотрят несколько специалистов центра, чтобы поставить точный диагноз.'],
    ['Пандус и парковка', 'Первый этаж, вход без ступенек, парковка у входа.'],
    ['Чай и кофе, пока ждёте', 'Бесплатно — чтобы визит к врачу был спокойнее.'],
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className={H2}>Почему нам доверяют</h2>
      <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([t, d]) => (
          <li key={t} className="spot lift rounded-3xl bg-white p-6 shadow-soft ring-1 ring-graphite/5"><b className="text-lg text-deep">{t}</b><p className="mt-2 text-[15px] leading-relaxed text-graphite/65">{d}</p></li>
        ))}
      </ul>
    </section>
  )
}

// Истории пациентов: места под материалы клиники (идеи Biruev и Hinge)
export function Stories() {
  const box = 'flex min-h-[280px] flex-col justify-end gap-2.5 rounded-[26px] border-2 border-dashed border-teal/45 bg-[repeating-linear-gradient(135deg,rgba(23,126,150,0.04)_0_12px,transparent_12px_24px)] p-6'
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <h2 className={H2}>Результаты, которыми гордимся</h2>
      <div data-stagger className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className={box}>
          <div className="mb-auto grid grid-cols-2 gap-2">{['ДО', 'ПОСЛЕ'].map((t) => <div key={t} className="flex aspect-square items-end rounded-2xl bg-[#0E2F38] p-3 text-sm font-bold text-white/60">{t}</div>)}</div>
          <NeedTag /><b className="text-lg text-deep">Снимки МРТ до и после курса</b><p className="text-sm text-graphite/60">2–3 случая: жалобы, что сделали, что изменилось. Только с письменного согласия пациента.</p>
        </div>
        <div className={box}>
          <div className="mb-auto flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon to-lime-soft"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lift"><Play size={22} className="fill-deep text-deep" /></span></div>
          <NeedTag /><b className="text-lg text-deep">Видео-истории</b><p className="text-sm text-graphite/60">2–3 коротких видео: пациент своими словами, 30–60 секунд.</p>
        </div>
        <div className={box}>
          <div className="mb-auto flex h-28 items-end gap-1.5" aria-hidden>{[95, 82, 66, 50, 36, 24].map((h) => <i key={h} className="flex-1 rounded-t-lg bg-gradient-to-b from-[#E2553A] to-[#FFB38F] opacity-75" style={{ height: `${h}%` }} />)}</div>
          <NeedTag /><b className="text-lg text-deep">Боль до и после — в цифрах</b><p className="text-sm text-graphite/60">Средняя оценка боли по шкале 0–10 в начале и в конце курса. Без данных клиники не пишем.</p>
        </div>
      </div>
    </section>
  )
}

// Чек-лист перед визитом (страницы ортопеда и ЛФК старого сайта) + памятка за номер
export function Prep() {
  const items = [
    ['Снимки и заключения', 'МРТ, рентген, выписки — всё, что есть по вашей проблеме'],
    ['Список жалоб', 'когда началось, что усиливает боль, что помогает'],
    ['Спортивная одежда и сменная обувь', 'если записаны на ЛФК'],
    ['Перед PRP — спросите врача о лекарствах', 'препараты, влияющие на свёртываемость, отменяют заранее — только по согласованию'],
    ['Заложите 30 минут', 'приём ортопеда длится 20–30 минут'],
  ]
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem('orto-prep') || '[]'); if (Array.isArray(s)) setChecked((c) => c.map((_, i) => !!s[i])) } catch { /* браузер без хранилища */ }
  }, [])
  const toggle = (i: number) => setChecked((c) => {
    const n = c.map((v, j) => (j === i ? !v : v))
    try { localStorage.setItem('orto-prep', JSON.stringify(n)) } catch { /* ignore */ }
    return n
  })
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').replace(/^[78]/, '').length !== 10) { setErr(true); return }
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-graphite/5 sm:p-7">
          <p className="text-xl font-bold text-deep">Чек-лист перед приёмом</p>
          <p className="mt-1 text-sm text-graphite/55">Отмечайте — пришлём его же в WhatsApp после записи.</p>
          <div className="mt-3">
            {items.map(([t, d], i) => (
              <label key={t} className="flex cursor-pointer gap-3.5 border-b border-graphite/5 py-3">
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="mt-0.5 h-5 w-5 shrink-0 accent-teal" />
                <span><span className="block">{t}</span><span className="text-[13px] text-graphite/55">{d}</span></span>
              </label>
            ))}
          </div>
        </div>
        <div data-reveal className="flex flex-col gap-3.5 rounded-[28px] bg-lime p-6 sm:p-7">
          <p className="text-2xl font-bold leading-tight tracking-[-0.02em]">Памятка «5 правил, чтобы спина не болела»</p>
          <ol className="list-decimal pl-5 leading-relaxed">
            {['Двигаться каждый день', 'Беречься от травм и ушибов', 'Следить за весом и меньше нервничать', 'Не переохлаждаться', 'Отказаться от вредных привычек'].map((t) => <li key={t}>{t}</li>)}
          </ol>
          <p className="text-[15px] text-graphite/75">Пришлём памятку с подробностями в WhatsApp — бесплатно.</p>
          {sent ? (
            <div className="mt-auto rounded-2xl bg-white p-4 text-[15px] text-deep"><b>Готово!</b> Памятка придёт в WhatsApp в течение минуты.<span className="mt-1 block text-xs text-graphite/55">В демо номер никуда не отправляется.</span></div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-auto">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input value={phone} onChange={(e) => { setPhone(e.target.value); setErr(false) }} type="tel" inputMode="tel" placeholder="+7 (900) 000-00-00" aria-label="Телефон для WhatsApp" className="min-w-0 flex-1 rounded-2xl px-4 py-3.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-teal" />
                <button type="submit" className="rounded-2xl bg-graphite px-5 py-3.5 font-bold text-lime">Получить</button>
              </div>
              {err && <p className="mt-2 text-sm text-[#8a2b12]">Введите номер телефона — 10 цифр после +7</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
