'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { CLINIC } from '@/lib/clinic'
import { asset } from '@/lib/asset'
import { openChat } from '@/components/ChatWidget'

const NAV = [
  { href: '#doctors', label: 'Врачи' },
  { href: '#endoscopy', label: 'Обследование во сне' },
  { href: '#procedures', label: 'Процедуры' },
  { href: '#prices', label: 'Цены' },
  { href: '#visit', label: 'Как добраться' },
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

        <nav className="ml-2 hidden gap-7 text-[15px] text-[#4a5357] xl:flex">
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
