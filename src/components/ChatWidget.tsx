'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle, X, ArrowUp } from 'lucide-react'
import clsx from 'clsx'
import { demoFetch } from '@/lib/demoApi'
import { asset } from '@/lib/asset'
import { PdConsent } from '@/components/site/Consent'

type Msg = { id: string; role: 'client' | 'assistant'; text: string; ts: number }

const GREETING =
  'Здравствуйте! Я ассистент администратора центра «Орто-Рекавери». Подскажу цену и запишу к нужному специалисту. Достаточно назвать направление — например, «колено» или «спина».'
// Согласие на обработку ПДн — отдельной отметкой до первого сообщения (ч. 1 ст. 9 152-ФЗ)
const CONSENT_KEY = 'orto-pd-consent'

// Открыть чат с любого места страницы:
// window.dispatchEvent(new CustomEvent('open-chat', { detail: { text: 'Болит колено' } }))
export function openChat(text?: string) {
  window.dispatchEvent(new CustomEvent('open-chat', { detail: { text } }))
}

export default function ChatWidget({ channel = 'web' }: { channel?: 'web' | 'whatsapp' }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [consent, setConsent] = useState(false)
  const [consentErr, setConsentErr] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { try { setConsent(localStorage.getItem(CONSENT_KEY) === '1') } catch { /* нет хранилища */ } }, [])
  const giveConsent = (v: boolean) => {
    setConsent(v); setConsentErr(false)
    try { v ? localStorage.setItem(CONSENT_KEY, '1') : localStorage.removeItem(CONSENT_KEY) } catch { /* нет хранилища */ }
  }

  const send = useCallback(
    async (raw: string) => {
      const t = raw.trim()
      if (!t) return
      setSending(true)
      setText('')
      setMessages((m) => [...m, { id: `tmp-${Date.now()}`, role: 'client', text: t, ts: Date.now() }])
      try {
        await demoFetch('/api/chat/send', {
          method: 'POST',
          body: JSON.stringify({ text: t, channel }),
        })
      } finally {
        setSending(false)
      }
    },
    [channel],
  )

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true)
      const t = (e as CustomEvent<{ text?: string }>).detail?.text
      if (!t) return
      // без согласия сообщение не отправляем — подставляем в поле, человек отправит сам
      let ok = false
      try { ok = localStorage.getItem(CONSENT_KEY) === '1' } catch { /* нет хранилища */ }
      if (ok) setTimeout(() => send(t), 350)
      else setText(t)
    }
    window.addEventListener('open-chat', onOpen)
    return () => window.removeEventListener('open-chat', onOpen)
  }, [send])

  // Поллинг ленты (ответы ассистента приходят из demoApi с задержкой)
  useEffect(() => {
    if (!open) return
    let alive = true
    const tick = async () => {
      const r = await demoFetch(`/api/chat/messages?channel=${channel}`)
      const data = await r.json()
      if (alive) setMessages(data.messages ?? [])
    }
    tick()
    const iv = setInterval(tick, 700)
    return () => {
      alive = false
      clearInterval(iv)
    }
  }, [open, channel])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const lastIsClient = messages.length > 0 && messages[messages.length - 1].role === 'client'

  return (
    <>
      <button
        aria-label={open ? 'Закрыть чат' : 'Написать администратору'}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 flex h-14 items-center gap-2.5 rounded-full bg-graphite pl-4 pr-5 text-[15px] font-medium text-white shadow-lift transition hover:bg-black sm:bottom-6 sm:right-6"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="hidden sm:inline">{open ? 'Свернуть' : 'Написать администратору'}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Чат с администратором"
          className="chat-in fixed inset-x-3 bottom-20 z-50 flex h-[min(600px,78vh)] flex-col overflow-hidden rounded-[22px] bg-white shadow-lift ring-1 ring-graphite/10 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[390px]"
        >
          <div className="flex items-center gap-3 border-b border-graphite/10 px-5 py-4">
            <img src={asset('/logo-dark.png')} alt="" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-graphite">Ассистент администратора</p>
              <p className="text-[13px] text-graphite/60">Программа для записи, отвечает сразу</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть чат" className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-ward text-graphite sm:hidden"><X size={18} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto bg-ward px-4 py-5">
            <p className="rounded-2xl bg-white/70 px-3 py-2 text-[12px] leading-snug text-graphite/60">Ассистент не является врачом, не ставит диагноз и не назначает лечение. Не отправляйте снимки и подробности о здоровье — их врач изучит на приёме. При острой боли или травме звоните 103.</p>
            <Bubble role="assistant" text={GREETING} />
            {messages.map((m) => (
              <Bubble key={m.id} role={m.role} text={m.text} />
            ))}
            {lastIsClient && <Typing />}
          </div>

          <form
            className="flex flex-wrap items-end gap-2 border-t border-graphite/10 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (!consent) { setConsentErr(true); return }
              if (!sending) send(text)
            }}
          >
            {!consent && <div className="w-full pb-1"><PdConsent checked={consent} onChange={giveConsent} error={consentErr} /></div>}
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Например: болит колено"
              aria-label="Сообщение"
              className="min-h-11 flex-1 rounded-2xl bg-ward px-4 text-[15px] text-graphite outline-none placeholder:text-graphite/40 focus-visible:ring-2 focus-visible:ring-teal"
            />
            <button
              type="submit"
              disabled={!text.trim() || sending}
              aria-label="Отправить"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-white transition disabled:opacity-30"
            >
              <ArrowUp size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function Bubble({ role, text }: { role: 'client' | 'assistant'; text: string }) {
  const isClient = role === 'client'
  return (
    <div className={clsx('flex', isClient ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[85%] whitespace-pre-wrap rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.45]',
          isClient ? 'rounded-br-md bg-teal text-white' : 'rounded-bl-md bg-white text-graphite',
        )}
      >
        {text}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex justify-start" aria-label="Администратор печатает">
      <div className="flex gap-1 rounded-[18px] rounded-bl-md bg-white px-4 py-3.5">
        {[0, 160, 320].map((d) => (
          <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-graphite/40" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  )
}
