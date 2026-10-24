'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { CLINIC } from '@/lib/clinic'
import { asset } from '@/lib/asset'
import { openChat } from '@/components/ChatWidget'

type AreaId = 'knee' | 'back' | 'arm' | 'foot'

// Прайс клиники (ПроДокторов, 19.10.2026). Время окна — пример до подключения МИС
const AREAS: Record<AreaId, { tag: string; ini: string; name: string; role: string; chips: string[]; slot: string; chat: string }> = {
  knee: { tag: 'Колено', ini: 'ХА', name: 'Хаджалов Абузар Магомедович', role: 'травматолог-ортопед · ПроДокторов 5,0', chips: ['Приём 3 000 ₽', 'PRP 10 500 ₽', 'УВТ 3 000 ₽', 'Гиалуроновая кислота 3 000 ₽'], slot: 'завтра, 16:30', chat: 'Здравствуйте, болит колено уже месяц' },
  back: { tag: 'Спина и шея', ini: 'КП', name: 'Куделя Павел Александрович', role: 'невролог, мануальный терапевт', chips: ['Полный приём 8 000 ₽', 'УВТ 3 000 ₽', 'ЛФК 2 500 ₽', 'Массаж спины 2 500 ₽'], slot: 'завтра, 10:00', chat: 'Здравствуйте, болит спина, есть грыжа поясницы' },
  arm: { tag: 'Плечо и кисть', ini: 'ХА', name: 'Хаджалов Абузар Магомедович', role: 'травматолог-ортопед, кистевой реабилитолог', chips: ['Приём 3 000 ₽', 'Разработка кисти 3 000 ₽', 'УВТ 3 000 ₽', 'Тейпирование 1 500 ₽'], slot: 'завтра, 11:30', chat: 'Здравствуйте, после перелома плохо разгибается кисть' },
  foot: { tag: 'Стопа и пятка', ini: 'ХА', name: 'Хаджалов Абузар Магомедович', role: 'травматолог-ортопед', chips: ['Приём 3 000 ₽', 'УВТ 3 000 ₽', 'Стельки Formthotics 13 500 ₽'], slot: 'завтра, 16:00', chat: 'Здравствуйте, болит пятка по утрам' },
}
const ORDER: AreaId[] = ['knee', 'back', 'arm', 'foot']
const HOTS: Record<AreaId, { x: number; y: number; label: string }> = {
  back: { x: 410, y: 202, label: 'Спина и шея' },
  arm: { x: 477, y: 233, label: 'Плечо и кисть' },
  knee: { x: 390, y: 394, label: 'Колено' },
  foot: { x: 433, y: 507, label: 'Стопа и пятка' },
}
const BEAMS: Record<AreaId, string> = {
  back: 'M410 202 C 385 190, 365 165, 342 150',
  arm: 'M477 233 C 505 232, 530 224, 558 217',
  foot: 'M433 507 C 480 507, 520 490, 553 469',
  knee: 'M390 394 C 355 392, 315 388, 278 384',
}
const TITLE = 'Покажите, где болит. Подскажем врача и цену'

export function HeroLive() {
  const [area, setArea] = useState<AreaId>('knee')
  const [shown, setShown] = useState<AreaId>('knee')
  const [swap, setSwap] = useState(false)
  const [typed, setTyped] = useState(false)
  const [score, setScore] = useState('5,0')
  const [scale, setScale] = useState(1)
  const [mobile, setMobile] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const figRef = useRef<SVGSVGElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Сцена 804×640 масштабируется под колонку; на телефоне — только панель с фигурой (600px)
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width
      const m = w < 640
      setMobile(m)
      setScale(m ? w / 600 : Math.min(w / 804, 1))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Плавная смена карточки врача
  useEffect(() => {
    if (area === shown) return
    setSwap(true)
    const t = setTimeout(() => { setShown(area); setSwap(false) }, 220)
    return () => clearTimeout(t)
  }, [area, shown])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chatT = setTimeout(() => setTyped(true), reduce ? 0 : 2600)
    if (reduce) return () => clearTimeout(chatT)

    // Автопоказ точек, пока человек сам не выбрал
    let i = 0
    autoRef.current = setInterval(() => { i = (i + 1) % ORDER.length; setArea(ORDER[i]) }, 3800)

    // «5,0» досчитывается
    let raf = 0
    const start = performance.now() + 900
    const step = (t: number) => {
      const p = Math.min(Math.max((t - start) / 900, 0), 1)
      setScore((p * 5).toFixed(1).replace('.', ','))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    // Голова поворачивается за курсором
    const onMove = (e: MouseEvent) => {
      const r = figRef.current?.getBoundingClientRect()
      if (!r || !headRef.current) return
      const ang = Math.max(-12, Math.min(12, (e.clientX - (r.left + r.width / 2)) / 30))
      const tilt = Math.max(-3, Math.min(3, (e.clientY - (r.top + r.height * 0.1)) / 120))
      headRef.current.style.transform = `rotate(${ang.toFixed(1)}deg) translateY(${tilt.toFixed(1)}px)`
    }
    document.addEventListener('mousemove', onMove)
    return () => {
      clearTimeout(chatT)
      if (autoRef.current) clearInterval(autoRef.current)
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  const pick = (a: AreaId) => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null }
    setArea(a)
  }
  const d = AREAS[shown]
  const docBody = (
    <div className="body">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-lime px-3 py-1 text-[13px] font-bold text-graphite">{d.tag}</span>
        <span className="text-xs text-white/60">выбрано на схеме</span>
      </div>
      <div className="mt-3.5 flex items-center gap-3">
        <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-neon font-extrabold text-deep">{d.ini}</span>
        <span className="leading-snug"><b className="text-base font-semibold">{d.name}</b><br /><span className="text-[13px] text-white/70">{d.role}</span></span>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">{d.chips.map((c) => <span key={c} className="hl-chip">{c}</span>)}</div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
        <span className="text-[13px] leading-snug text-white/75">Ближайшее окно<br /><b className="text-[15px] text-white">{d.slot}</b></span>
        <button type="button" onClick={() => openChat(d.chat)} className="rounded-[14px] bg-neon px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5">Записаться</button>
      </div>
    </div>
  )

  return (
    <>
      <section id="top" className="hl">
        <div className="hl-blob hl-b1" aria-hidden="true" />
        <div className="hl-blob hl-b2" aria-hidden="true" />
        <div className="hl-blob hl-b3" aria-hidden="true" />
        <div className="hl-dots" aria-hidden="true" />
        <div className="hl-ring" aria-hidden="true" />
        <div className="hl-ring2" aria-hidden="true" />
        <svg className="hl-wave" aria-hidden="true" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none">
          <path d="M0 140 C 260 40, 480 50, 720 120 S 1180 200, 1440 80" stroke="#48F6FF" strokeWidth="6" strokeLinecap="round" opacity=".8" />
          <path d="M0 168 C 280 75, 500 80, 740 150 S 1170 220, 1440 115" stroke="#177E96" strokeWidth="3" strokeLinecap="round" opacity=".45" />
        </svg>

        <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-8 lg:pb-20 lg:pt-12">
          <div className="lg:pt-6">
            <p className="hl-pill"><span className="hl-live" />Центр восстановительной медицины в Махачкале</p>
            <h1 className="hl-h1">
              {TITLE.split(' ').map((w, i) => (
                <Fragment key={i}><span className="w" style={{ animationDelay: `${(0.08 * i).toFixed(2)}s, 0s` }}>{w}</span>{' '}</Fragment>
              ))}
            </h1>
            <p className="hl-up mt-5 max-w-[520px] text-lg leading-relaxed text-[#3d4447]" style={{ animationDelay: '.55s' }}>
              Нажмите на точку — увидите, кто ведёт приём, что может назначить врач и сколько это стоит. Запись в один клик или в чате.
            </p>
            <div className="hl-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '.7s' }}>
              <button type="button" onClick={() => openChat()} className="hl-btn">
                <span>Записаться на приём</span>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#48F6FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <a href="#prices" className="hl-ghost">Все цены</a>
            </div>
            <div className="hl-up" style={{ animationDelay: '.85s' }}>
              <div className="hl-rating">
                <div className="hidden pl-0.5 sm:flex">
                  <span className="hl-ava" style={{ background: '#177E96', color: '#fff' }}>ХА</span>
                  <span className="hl-ava" style={{ background: '#F2FF59', color: '#212121' }}>КП</span>
                  <span className="hl-ava" style={{ background: '#FFE3D9', color: '#212121' }}>МЭ</span>
                  <span className="hl-ava" style={{ background: '#0B3D4A', color: '#fff' }}>КА</span>
                </div>
                <div className="leading-tight">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="hl-score">{score}</span>
                    <span className="hl-stars" aria-label="5 звёзд из 5">
                      {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ animationDelay: `${1.1 + i * 0.1}s` }}>★</span>)}
                    </span>
                    <a href={CLINIC.rating2gis.url} target="_blank" rel="noreferrer" className="hl-badge" style={{ background: 'linear-gradient(180deg,#2FC236,#19AA1E)' }}>2ГИС 5,0</a>
                    <a href={CLINIC.ratingYandex.url} target="_blank" rel="noreferrer" className="hl-badge" style={{ background: 'linear-gradient(180deg,#FF6A4D,#FC3F1D)' }}>Яндекс {CLINIC.ratingYandex.value}</a>
                  </div>
                  <p className="mt-1 text-[13px] text-[#4a5357]">Ортопеды, невролог, реабилитологи, эндоскопист</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div ref={boxRef} className={`relative w-full${mobile ? ' hl-mobile' : ''}`} style={{ height: (mobile ? 600 : 640) * scale }}>
              <div className="hl-scene" style={{ transform: mobile ? `translateX(${-154 * scale}px) scale(${scale})` : `scale(${scale})` }}>
                <div className="hl-in">
                  <div className="hl-panel"><div className="hl-scan" aria-hidden="true" /></div>
                  <div className="hl-floor" aria-hidden="true" />

                  <svg ref={figRef} className="hl-figure" viewBox="0 0 200 420" aria-hidden="true" fill="none">
                    <defs>
                      <linearGradient id="hlSkin" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="160" y2="0">
                        <stop offset="0" stopColor="#B8F2F8" /><stop offset=".45" stopColor="#5CC6D8" /><stop offset="1" stopColor="#177E96" />
                      </linearGradient>
                      <linearGradient id="hlSkinDeep" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="160" y2="0">
                        <stop offset="0" stopColor="#8FE3EE" /><stop offset=".5" stopColor="#3FAFC5" /><stop offset="1" stopColor="#0F5C6E" />
                      </linearGradient>
                      <radialGradient id="hlGlow"><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
                    </defs>
                    <path d="M88 200 L85 300" stroke="url(#hlSkinDeep)" strokeWidth="28" strokeLinecap="round" />
                    <path d="M112 200 L115 300" stroke="url(#hlSkinDeep)" strokeWidth="28" strokeLinecap="round" />
                    <path d="M85 300 L83 384" stroke="url(#hlSkin)" strokeWidth="22" strokeLinecap="round" />
                    <path d="M115 300 L117 384" stroke="url(#hlSkin)" strokeWidth="22" strokeLinecap="round" />
                    <ellipse cx="77" cy="394" rx="15" ry="7" fill="url(#hlSkinDeep)" />
                    <ellipse cx="123" cy="394" rx="15" ry="7" fill="url(#hlSkinDeep)" />
                    <circle cx="85" cy="300" r="12" fill="url(#hlGlow)" />
                    <circle cx="115" cy="300" r="12" fill="url(#hlGlow)" />
                    <g className="hl-upper">
                      <path d="M60 92 C 52 120, 46 140, 44 166 C 42 190, 42 206, 42 224" stroke="url(#hlSkin)" strokeWidth="20" strokeLinecap="round" />
                      <path d="M140 92 C 148 120, 154 140, 156 166 C 158 190, 158 206, 158 224" stroke="url(#hlSkinDeep)" strokeWidth="20" strokeLinecap="round" />
                      <circle cx="42" cy="233" r="9" fill="url(#hlSkin)" />
                      <circle cx="158" cy="233" r="9" fill="url(#hlSkinDeep)" />
                      <circle cx="44" cy="166" r="9" fill="url(#hlGlow)" />
                      <circle cx="156" cy="166" r="9" fill="url(#hlGlow)" />
                      <path d="M62 84 C 78 74, 122 74, 138 84 C 147 90, 148 100, 146 112 L 138 186 C 136 200, 126 206, 114 206 L 86 206 C 74 206, 64 200, 62 186 L 54 112 C 52 100, 53 90, 62 84 Z" fill="url(#hlSkin)" />
                      <path d="M66 96 C 62 120, 62 150, 66 180" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".45" />
                      <path d="M84 98 Q100 92 116 98" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" />
                      <g className={`hl-spine${area === 'back' ? ' on' : ''}`}>
                        {[104, 114, 124, 134, 144, 154, 164, 174, 184, 194].map((y) => <circle key={y} cx="100" cy={y} r="2.6" fill="#fff" opacity=".55" />)}
                      </g>
                      <rect x="92" y="56" width="16" height="20" rx="7" fill="url(#hlSkinDeep)" />
                      <g ref={headRef} className="hl-head">
                        <circle cx="100" cy="36" r="23" fill="url(#hlSkin)" />
                        <path d="M86 26 Q92 16 104 15" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".55" />
                      </g>
                    </g>
                  </svg>

                  <svg className="hl-beams absolute left-0 top-0" width="760" height="640" aria-hidden="true" fill="none">
                    <defs><linearGradient id="hlBeam"><stop offset="0" stopColor="#48F6FF" stopOpacity="0" /><stop offset=".5" stopColor="#48F6FF" /><stop offset="1" stopColor="#F2FF59" /></linearGradient></defs>
                    {ORDER.map((a) => (
                      <g key={a} className={area === a ? 'on' : ''}><path className="base" d={BEAMS[a]} /><path className="light" d={BEAMS[a]} /></g>
                    ))}
                  </svg>

                  {ORDER.map((a) => (
                    <button key={a} type="button" className={`hl-hot${area === a ? ' on' : ''}`} style={{ left: HOTS[a].x, top: HOTS[a].y }} aria-label={HOTS[a].label} aria-pressed={area === a} onClick={() => pick(a)} onMouseEnter={() => pick(a)}>
                      <b /><em /><i />
                    </button>
                  ))}

                  <button type="button" className={`hl-call${area === 'back' ? ' on' : ''}`} style={{ left: 150, top: 120 }} onClick={() => pick('back')} onMouseEnter={() => pick('back')}>
                    <span className="ic" style={{ background: '#DDF8FB' }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#177E96" strokeWidth="2" strokeLinecap="round"><path d="M12 3v18M8 7h8M7 12h10M8 17h8" /></svg></span>
                    <span><b className="font-bold">Спина и шея</b><br /><span className="text-[#5b6266]">невролог, 8 000 ₽</span></span>
                  </button>
                  <button type="button" className={`hl-call${area === 'arm' ? ' on' : ''}`} style={{ left: 560, top: 190, animationDelay: '-1.6s' }} onClick={() => pick('arm')} onMouseEnter={() => pick('arm')}>
                    <span className="ic" style={{ background: '#FFE3D9' }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C2563A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V5a2 2 0 0 1 4 0v6M15 10V7a2 2 0 0 1 4 0v7a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a2 2 0 0 1 3-2l1 1" /></svg></span>
                    <span><b className="font-bold">Плечо и кисть</b><br /><span className="text-[#5b6266]">ортопед, 3 000 ₽</span></span>
                  </button>
                  <button type="button" className={`hl-call${area === 'foot' ? ' on' : ''}`} style={{ left: 555, top: 440, animationDelay: '-3.1s' }} onClick={() => pick('foot')} onMouseEnter={() => pick('foot')}>
                    <span className="ic" style={{ background: '#F8FFC9' }}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3c-2 4-2 9 0 13 1 2 3 3 5 3h4a2 2 0 0 0 0-4h-3" /></svg></span>
                    <span><b className="font-bold">Стопа и пятка</b><br /><span className="text-[#5b6266]">УВТ, 3 000 ₽</span></span>
                  </button>

                  <figure className="hl-photo hl-up" style={{ animationDelay: '1s' }}>
                    <img src={asset('/photos/reception.jpg')} alt="Стойка администратора центра" />
                    <figcaption>мы на Имама Шамиля, 35А</figcaption>
                  </figure>

                  <div className={`hl-doc hl-up${swap ? ' swap' : ''}`} style={{ animationDelay: '1.2s' }} aria-live="polite">{docBody}</div>

                  <div className="hl-chat hl-up" style={{ animationDelay: '1.6s' }}>
                    <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white shadow-lift"><img src={asset('/logo-dark.png')} alt="" className="w-[30px]" /></span>
                    <p className="hl-bubble">
                      {typed ? <span className="hl-up block">Здравствуйте! Подскажу цену и запишу к нужному врачу — даже вечером</span>
                        : <span className="hl-typing" aria-label="Администратор печатает"><span /><span /><span /></span>}
                    </p>
                  </div>

                  <p className="hl-hand" aria-hidden="true">нажмите на точку ↘</p>
                </div>
              </div>
            </div>
            {mobile && <div className={`hl-doc hl-doc-m${swap ? ' swap' : ''}`} aria-live="polite">{docBody}</div>}
          </div>
        </div>
      </section>

      <div className="hl-trust">
        <div className="hl-track">
          {[0, 1].map((k) => (
            <Fragment key={k}>
              <span>Лицензированный медцентр</span><span>Рассрочка без переплат</span><span>Реабилитолог на дом — 4 000 ₽</span><span>Справка для налогового вычета</span><span>Пандус и парковка</span><span>Принимаем взрослых и детей</span>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
