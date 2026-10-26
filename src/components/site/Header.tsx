'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Phone } from 'lucide-react'
import { CLINIC } from '@/lib/clinic'
import { asset } from '@/lib/asset'
import { openChat } from '@/components/ChatWidget'

const NAV = [
  { href: '#start', label: 'С чего начать' },
  { href: '#conditions', label: 'Что лечим' },
  { href: '#doctors', label: 'Врачи' },
  { href: '#prices', label: 'Цены' },
  { href: '#visit', label: 'Как добраться' },
]

// Мега-меню «Услуги» (идея вкладок Biruev); цены — прайс ПроДокторов
const MENU: { title: string; items: [string, string, string][] }[] = [
  { title: 'Приём врача', items: [['Травматолог-ортопед', '3 000 ₽', '#doctors'], ['Невролог, полный приём', '8 000 ₽', '#doctors'], ['Реабилитолог', '2 000 ₽', '#prices'], ['Реабилитолог на дому', '4 000 ₽', '#prices'], ['Эндокринолог-нутрициолог', '4 000 ₽', '#prices'], ['Психолог', '3 000 ₽', '#prices']] },
  { title: 'Методы лечения', items: [['Ударно-волновая терапия', '3 000 ₽', '#procedures'], ['PRP-терапия', '10 500 ₽', '#prp'], ['ЛФК, 60 минут', '2 500 ₽', '#procedures'], ['Массаж спины', '2 500 ₽', '#prices'], ['Кинезиотейпирование', '1 500 ₽', '#prices'], ['Магнит с лазером', '2 000 ₽', '#prices']] },
  { title: 'Диагностика', items: [['Гастроскопия во сне', '6 000 ₽', '#endoscopy'], ['Колоноскопия во сне', '10 000 ₽', '#endoscopy'], ['Оба обследования', '14 000 ₽', '#endoscopy'], ['Лабораторные анализы', 'от 595 ₽', '#prices'], ['Второе мнение перед операцией', '3 000 ₽', '#second']] },
]

// Стеклянная плавающая шапка: при прокрутке становится плотнее
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4" style={{ background: scrolled ? 'transparent' : '#DDF8FB' }}>
      <div
        className={`mx-auto flex max-w-[1320px] items-center gap-6 rounded-[22px] border border-white/90 py-2.5 pl-4 pr-2.5 backdrop-blur transition-all duration-300 sm:pl-6 ${
          scrolled ? 'bg-white/90 shadow-lift' : 'bg-white/80 shadow-[0_18px_40px_-28px_rgba(11,61,74,0.5)]'
        }`}
      >
        <a href="#top" className="shrink-0" aria-label="Орто-Рекавери, на главную">
          <img src={asset('/logo-dark.png')} alt="Орто-Рекавери, центр восстановительной медицины" className="h-10 w-auto sm:h-12" />
        </a>

        <nav className="ml-2 hidden items-center gap-7 text-[15px] text-[#4a5357] xl:flex">
          <div className="group relative">
            <button type="button" aria-haspopup="true" className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-graphite">
              Услуги <ChevronDown size={14} className="transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute -left-6 top-full z-50 grid w-[760px] translate-y-2 grid-cols-3 gap-6 rounded-3xl bg-white p-6 text-graphite opacity-0 shadow-lift ring-1 ring-graphite/5 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {MENU.map((col) => (
                <div key={col.title}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal">{col.title}</p>
                  {col.items.map(([name, price, href]) => (
                    <a key={name} href={href} className="flex justify-between gap-3 border-b border-graphite/5 py-2 text-sm hover:text-teal">
                      {name}<span className="whitespace-nowrap text-graphite/50">{price}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="group relative whitespace-nowrap transition-colors hover:text-graphite">
              {l.label}
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 origin-left scale-x-0 rounded bg-teal transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a href={`tel:${CLINIC.phone.replace(/[^\d+]/g, '')}`} className="hidden flex-col items-end leading-tight md:flex">
            <b className="whitespace-nowrap text-[15px] text-graphite">{CLINIC.phone}</b>
            <span className="text-xs text-[#5b6266]">пн–пт 9–18, сб 9–16</span>
          </a>
          <a href={`tel:${CLINIC.phone.replace(/[^\d+]/g, '')}`} aria-label="Позвонить" className="flex h-11 w-11 items-center justify-center rounded-full bg-ward text-graphite md:hidden">
            <Phone size={18} />
          </a>
          <button
            type="button"
            onClick={() => openChat()}
            className="h-12 whitespace-nowrap rounded-[16px] bg-teal px-5 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(23,126,150,0.8)] transition hover:-translate-y-0.5"
          >
            Записаться
          </button>
        </div>
      </div>
    </header>
  )
}
