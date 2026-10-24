'use client'

import { demoFetch } from '@/lib/demoApi'
import { useEffect, useRef, useState, useCallback } from 'react'
import type { ConvState } from '@/lib/types'
import {
  RefreshCw,
  Wifi,
  WifiOff,
  MessageCircle,
  Phone,
} from 'lucide-react'
import LeadCard from '@/components/dashboard/LeadCard'
import BookingCard from '@/components/dashboard/BookingCard'
import RemindersTimeline from '@/components/dashboard/RemindersTimeline'
import ReactivationList from '@/components/dashboard/ReactivationList'
import HandoffBanner from '@/components/dashboard/HandoffBanner'
import WhatsAppPanel from '@/components/dashboard/WhatsAppPanel'

type UIState =
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'empty' }
  | { phase: 'success'; data: ConvState }

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

const CHANNEL_ICON: Record<string, React.ReactNode> = {
  web: <MessageCircle size={14} />,
  whatsapp: <Phone size={14} />,
}

const CHANNEL_LABEL: Record<string, string> = {
  web: 'Web-чат',
  whatsapp: 'WhatsApp',
}

// ---------- Skeleton ----------
function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`bg-ink-100 rounded-xl animate-pulse ${className ?? ''}`} />
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-7 w-52" />
        <SkeletonBlock className="h-8 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <SkeletonBlock className="h-40 w-full" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
        <div className="space-y-3">
          <SkeletonBlock className="h-32 w-full" />
          <SkeletonBlock className="h-28 w-full" />
          <SkeletonBlock className="h-20 w-full" />
        </div>
      </div>
      <SkeletonBlock className="h-48 w-full" />
    </div>
  )
}

// ---------- Main ----------
export default function DashboardLive() {
  const [ui, setUi] = useState<UIState>({ phase: 'loading' })
  const [resetLoading, setResetLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchState = useCallback(async () => {
    try {
      const res = await demoFetch('/api/state', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ConvState = await res.json()
      if (data.messages.length === 0) {
        setUi({ phase: 'empty' })
      } else {
        setUi({ phase: 'success', data })
      }
    } catch (err) {
      setUi((prev) => {
        // don't overwrite success with a transient error — keep last data
        if (prev.phase === 'success') return prev
        return {
          phase: 'error',
          message:
            err instanceof Error ? err.message : 'Не удалось загрузить данные',
        }
      })
    }
  }, [])

  useEffect(() => {
    fetchState()
    intervalRef.current = setInterval(fetchState, 1500)
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [fetchState])

  // Автоскролл ТОЛЬКО внутренней ленты диалога (не окна) и только если пользователь у низа.
  // Иначе scrollIntoView тянет всю страницу вниз каждые 1.5с и нельзя пролистать вверх.
  useEffect(() => {
    if (ui.phase !== 'success') return
    const c = messagesEndRef.current?.parentElement
    if (!c) return
    const nearBottom = c.scrollHeight - c.scrollTop - c.clientHeight < 160
    if (nearBottom) c.scrollTop = c.scrollHeight
  }, [ui])

  async function handleReset() {
    setResetLoading(true)
    try {
      await demoFetch('/api/reset', { method: 'POST' })
      setUi({ phase: 'loading' })
      await fetchState()
    } finally {
      setResetLoading(false)
    }
  }

  // --- Loading ---
  if (ui.phase === 'loading') {
    return <DashboardSkeleton />
  }

  // --- Error ---
  if (ui.phase === 'error') {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-card p-6 max-w-sm w-full space-y-4 text-center">
          <WifiOff size={36} className="text-ink-300 mx-auto" />
          <div>
            <p className="font-semibold text-ink-700">Не удалось подключиться</p>
            <p className="text-sm text-ink-400 mt-1 leading-relaxed">
              Пульт не может получить данные от сервера. Проверьте соединение и попробуйте снова.
            </p>
            <p className="text-[11px] text-ink-300 mt-2 font-mono">{ui.message}</p>
          </div>
          <button
            onClick={() => { setUi({ phase: 'loading' }); fetchState() }}
            className="w-full flex items-center justify-center gap-2 bg-brand text-white font-semibold rounded-xl py-2.5 hover:bg-brand-dark transition-colors"
          >
            <RefreshCw size={15} />
            Обновить
          </button>
        </div>
      </div>
    )
  }

  // --- Empty ---
  if (ui.phase === 'empty') {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col">
        {/* Header even in empty state */}
        <header className="bg-white shadow-card px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <span className="font-bold text-ink-700 text-sm leading-tight">
            Пульт администратора<br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            <span className="text-brand">Орто-Рекавери</span>
          </span>
          <button
            onClick={handleReset}
            disabled={resetLoading}
            aria-label="Сбросить демо"
            className="flex items-center gap-1.5 text-xs text-ink-500 border border-ink-200 rounded-lg px-3 py-1.5 hover:bg-ink-50 transition-colors"
          >
            <RefreshCw size={12} className={resetLoading ? 'animate-spin' : ''} />
            Сброс
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3 max-w-xs">
            <MessageCircle size={40} className="text-ink-200 mx-auto" />
            <p className="font-semibold text-ink-700">Диалогов пока нет</p>
            <p className="text-sm text-ink-400 leading-relaxed">
              Напишите в виджет на сайте — здесь появится лид, данные пациента и запись в реальном времени.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // --- Success ---
  const { data } = ui
  const clientMessages = data.messages.filter((m) => m.channel === 'web' || true)
  const lastMsg = data.messages[data.messages.length - 1]
  const isTyping = lastMsg?.role === 'client'

  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* ---- Top bar ---- */}
      <header className="bg-white shadow-card px-3 py-2.5 sm:px-4 sm:py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto w-full min-w-0 flex items-center gap-2 flex-wrap">
          {/* Title */}
          <h1 className="font-bold text-ink-700 text-sm leading-tight mr-auto min-w-0">
            <span className="text-brand">Орто-Рекавери</span>
            <span className="hidden sm:inline text-ink-300 mx-1">·</span>
            <span className="hidden sm:inline text-ink-500 font-semibold">Пульт администратора</span>
          </h1>

          {/* Channel badge */}
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-mint-100 text-mint-600 whitespace-nowrap">
            {CHANNEL_ICON[data.channel]}
            {CHANNEL_LABEL[data.channel] ?? data.channel}
          </span>

          {/* Reset */}
          <button
            onClick={handleReset}
            disabled={resetLoading}
            aria-label="Сбросить демо"
            className="flex items-center gap-1.5 text-xs text-ink-500 border border-ink-200 rounded-lg px-2.5 py-1.5 hover:bg-ink-50 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            <RefreshCw size={12} className={resetLoading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Сброс демо</span>
            <span className="sm:hidden">Сброс</span>
          </button>
        </div>
      </header>

      {/* ---- Main grid ---- */}
      <main className="max-w-5xl mx-auto p-4 space-y-4">
        {/* Handoff banner */}
        <HandoffBanner active={data.handoff} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ---- LEFT: Conversation feed ---- */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col h-[460px] md:h-[600px] min-w-0">
            <div className="px-4 py-3 border-b border-ink-100 flex items-center gap-2">
              <Wifi size={15} className="text-mint-500" />
              <span className="font-semibold text-ink-700 text-sm">Диалог</span>
              <span className="ml-auto text-xs text-ink-400">
                {data.messages.length} сообщ.
              </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 space-y-2">
              {data.messages.map((msg) => {
                const isClient = msg.role === 'client'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-0.5 ${isClient ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] min-w-0 rounded-2xl px-3 py-2 text-sm leading-snug ${
                        isClient
                          ? 'bg-brand text-white rounded-tr-sm'
                          : 'bg-ink-50 text-ink-700 rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-1 max-w-[85%] ${isClient ? 'flex-row-reverse' : 'flex-row'}`}>
                      <span className="text-[10px] text-ink-300 whitespace-nowrap">{formatTime(msg.ts)}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                          msg.channel === 'whatsapp'
                            ? 'bg-[#dcf8c6] text-[#075e54]'
                            : 'bg-mint-100 text-mint-700'
                        }`}
                      >
                        {msg.channel === 'whatsapp' ? 'WA' : 'Web'}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-ink-50 rounded-2xl rounded-tl-sm px-3 py-2">
                    <span className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-ink-300 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ---- RIGHT: Cards column ---- */}
          <div className="space-y-4">
            <LeadCard lead={data.lead} />
            <BookingCard booking={data.booking} />
            <RemindersTimeline booking={data.booking} reminders={data.reminders} />
            <ReactivationList items={data.reactivation} />
          </div>
        </div>

        {/* ---- WhatsApp panel ---- */}
        <WhatsAppPanel messages={data.messages} />
      </main>
    </div>
  )
}
