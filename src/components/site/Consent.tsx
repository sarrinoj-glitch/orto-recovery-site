'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Согласие на cookie хранится в браузере. Пока посетитель не принял все cookie,
// сторонние виджеты (Яндекс Карты) не загружаются — карта показывается по кнопке.
const KEY = 'orto-cookie'
type Choice = 'all' | 'necessary' | null

function read(): Choice {
  try { const v = localStorage.getItem(KEY); return v === 'all' || v === 'necessary' ? v : null } catch { return null }
}
function save(v: Exclude<Choice, null>) {
  try { localStorage.setItem(KEY, v) } catch { /* браузер без хранилища — спросим снова */ }
  window.dispatchEvent(new CustomEvent('orto-cookie', { detail: v }))
}

export function useCookieChoice() {
  const [choice, setChoice] = useState<Choice>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setChoice(read()); setReady(true)
    const on = (e: Event) => setChoice((e as CustomEvent<Choice>).detail)
    window.addEventListener('orto-cookie', on)
    return () => window.removeEventListener('orto-cookie', on)
  }, [])
  return { choice, ready }
}

const docHref = (slug: string) => `https://sarrinoj-glitch.github.io/orto-recovery-full/dokumenty/${slug}/`

export function CookieBanner() {
  const { choice, ready } = useCookieChoice()
  if (!ready || choice) return null
  return (
    <div role="dialog" aria-live="polite" aria-label="Уведомление о cookie" className="fixed inset-x-3 bottom-24 z-[65] mx-auto max-w-2xl rounded-[20px] bg-white p-4 shadow-[0_24px_60px_-20px_rgba(11,61,74,0.55)] ring-1 ring-graphite/10 sm:bottom-6 sm:p-5 md:left-6 md:right-auto">
      <p className="text-[14px] leading-relaxed text-graphite/80">
        Сайт использует необходимые cookie, а карта проезда — cookie Яндекса. Нажимая «Принять все», вы соглашаетесь на их использование по{' '}
        <Link href={docHref('cookie')} className="text-teal underline underline-offset-2">Политике cookie</Link> и{' '}
        <Link href={docHref('politika')} className="text-teal underline underline-offset-2">Политике обработки персональных данных</Link>.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => save('all')} className="h-11 rounded-full bg-deep px-5 text-[15px] font-semibold text-white">Принять все</button>
        <button type="button" onClick={() => save('necessary')} className="h-11 rounded-full border border-graphite/20 px-5 text-[15px] font-semibold text-graphite">Только необходимые</button>
      </div>
    </div>
  )
}

// Сторонний iframe: загружается только после согласия или явного нажатия
export function ConsentFrame({ src, title, className, label, action = 'Показать' }: { src: string; title: string; className?: string; label: string; action?: string }) {
  const { choice } = useCookieChoice()
  const [forced, setForced] = useState(false)
  if (choice === 'all' || forced) return <iframe title={title} src={src} loading="lazy" className={className} />
  return (
    <div className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${className ?? ''}`}>
      <p className="max-w-sm text-[15px] text-graphite/70">{label} загружается с серверов Яндекса и использует их cookie.</p>
      <button type="button" onClick={() => setForced(true)} className="h-11 rounded-full bg-deep px-5 text-[15px] font-semibold text-white">{action}</button>
    </div>
  )
}

// Отметка согласия на обработку ПДн — отдельным полем, не отмечена заранее (ч. 1 ст. 9 152-ФЗ)
export function PdConsent({ checked, onChange, error, dark }: { checked: boolean; onChange: (v: boolean) => void; error?: boolean; dark?: boolean }) {
  const link = dark ? 'text-neon underline underline-offset-2' : 'text-teal underline underline-offset-2'
  return (
    <div>
      <label className={`flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug ${dark ? 'text-white/80' : 'text-graphite/70'}`}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-teal" />
        <span>
          Даю <Link href={docHref('soglasie')} className={link} target="_blank">согласие на обработку персональных данных</Link>, ознакомлен(а) с{' '}
          <Link href={docHref('politika')} className={link} target="_blank">Политикой</Link>
        </span>
      </label>
      {error && <p className={`mt-1.5 text-[13px] ${dark ? 'text-coral' : 'text-[#a3341d]'}`}>Отметьте согласие, чтобы отправить сообщение</p>}
    </div>
  )
}

export function MedWarning({ className }: { className?: string }) {
  return <p className={`font-semibold uppercase tracking-[0.02em] ${className ?? ''}`}>Имеются противопоказания. Необходима консультация специалиста</p>
}
