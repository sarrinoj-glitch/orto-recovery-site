'use client'

import { demoFetch } from '@/lib/demoApi'
import { useState } from 'react'
import type { Msg } from '@/lib/types'
import { Phone } from 'lucide-react'

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export default function WhatsAppPanel({ messages }: { messages: Msg[] }) {
  const [loading, setLoading] = useState(false)

  const waMessages = messages.filter((m) => m.channel === 'whatsapp')

  async function handleMissedCall() {
    setLoading(true)
    try {
      await demoFetch('/api/missed-call', { method: 'POST' })
    } catch {
      // silent — poller will sync
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* WhatsApp header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#25D366' }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">ОР</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Орто-Рекавери</p>
          <p className="text-white/80 text-xs">онлайн</p>
        </div>
        <Phone size={16} className="text-white ml-auto" />
      </div>

      {/* Messages area */}
      <div
        className="h-52 overflow-y-auto px-3 py-3 space-y-2 flex flex-col"
        style={{ background: '#ECE5DD' }}
      >
        {waMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-center text-[#667781] bg-white/70 rounded-lg px-3 py-2 max-w-[220px] leading-relaxed">
              Нажмите кнопку ниже — ассистент сам напишет клиенту, который не дозвонился.
            </p>
          </div>
        ) : (
          waMessages.map((msg) => {
            const isAssistant = msg.role === 'assistant'
            return (
              <div
                key={msg.id}
                className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-snug shadow-sm ${
                    isAssistant
                      ? 'bg-white text-[#111B21] rounded-tl-sm'
                      : 'text-white rounded-tr-sm'
                  }`}
                  style={!isAssistant ? { background: '#25D366' } : undefined}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      isAssistant ? 'text-[#667781]' : 'text-white/70'
                    }`}
                  >
                    {formatTime(msg.ts)}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* CTA */}
      <div className="px-4 py-3 border-t border-ink-100">
        <button
          onClick={handleMissedCall}
          disabled={loading}
          aria-label="Симулировать пропущенный звонок"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm rounded-xl py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Phone size={15} />
          )}
          Симулировать пропущенный звонок
        </button>
      </div>
    </div>
  )
}
