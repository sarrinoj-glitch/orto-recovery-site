'use client'

// Демо без сервера: те же «эндпоинты», что были у API, но состояние живёт в localStorage.
// Сайт и пульт, открытые в одном браузере, видят общий диалог (поллинг читает localStorage).
import type { Channel, ConvState } from './types'
import { seedState, newMsg, applyAssistantAction } from './state'
import { nextScriptedReply } from './script'

const KEY = 'orto-demo-state'
const REPLY_DELAY_MS = 1800

function load(): ConvState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as ConvState
  } catch {
    /* приватный режим / битые данные — начинаем с чистого состояния */
  }
  return seedState()
}

function save(s: ConvState): ConvState {
  s.updatedTs = Date.now()
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* без хранилища демо работает в пределах вкладки */
  }
  return s
}

function answerPending() {
  const s = load()
  if (!s.messages.some((m) => m.role === 'client' && !m.answered)) return
  save(applyAssistantAction(s, nextScriptedReply(s)))
}

function handle(path: string, body: Record<string, unknown>): unknown {
  switch (path) {
    case '/api/state':
      return load()
    case '/api/chat/messages': {
      const s = load()
      const channel = (body.channel as Channel) ?? 'web'
      return {
        messages: s.messages.filter((m) => m.channel === channel),
        stage: s.lead.stage,
        booking: s.booking,
        handoff: s.handoff,
        mode: s.mode,
      }
    }
    case '/api/chat/send': {
      const text = String(body.text ?? '').trim()
      if (!text) return { error: 'empty' }
      const channel = (body.channel as Channel) ?? 'web'
      const s = load()
      s.channel = channel
      s.messages.push(newMsg({ role: 'client', text, channel, answered: false }))
      if (s.lead.stage === 'new') s.lead.stage = 'qualifying'
      save(s)
      setTimeout(answerPending, REPLY_DELAY_MS)
      return { ok: true }
    }
    case '/api/script/next':
      answerPending()
      return { ok: true }
    case '/api/missed-call': {
      const s = load()
      s.channel = 'whatsapp'
      s.messages.push(
        newMsg({
          role: 'assistant',
          channel: 'whatsapp',
          answered: true,
          text:
            'Здравствуйте! Это центр восстановительной медицины «Орто-Рекавери». Вы только что звонили нам, но мы не успели ответить. ' +
            'Подскажите, что вас беспокоит — я подскажу цену и запишу к нужному специалисту. ' +
            'Работаем Пн–Пт 9:00–18:00, Сб 9:00–16:00, пр. Имама Шамиля, 35А.',
        }),
      )
      if (s.lead.stage === 'new') s.lead.stage = 'qualifying'
      save(s)
      return { ok: true }
    }
    case '/api/reactivation': {
      const s = load()
      const index = body.index as number
      if (typeof index === 'number' && s.reactivation[index]) s.reactivation[index].status = 'messaged'
      save(s)
      return { ok: true }
    }
    case '/api/reset':
      return save(seedState())
    default:
      return { ok: true }
  }
}

// Подмена fetch для компонентов демо: demoFetch('/api/...', init) → Response
export async function demoFetch(url: string, init?: RequestInit): Promise<Response> {
  const u = new URL(url, 'http://demo.local')
  let body: Record<string, unknown> = Object.fromEntries(u.searchParams)
  if (typeof init?.body === 'string') {
    try {
      body = { ...body, ...JSON.parse(init.body) }
    } catch {
      /* тело не JSON — игнорируем */
    }
  }
  const data = handle(u.pathname, body)
  return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } })
}
