// Состояние демо: чистая логика без сервера (хранится в localStorage браузера, см. demoApi.ts)
import type { ConvState, Msg, Reminder } from './types'

let counter = 0
const id = () => `${Date.now()}-${counter++}`

export function seedState(): ConvState {
  return {
    messages: [],
    lead: { qualified: false, stage: 'new' },
    booking: null,
    reminders: [],
    reactivation: [
      { name: 'Патимат А.', lastVisit: 'май 2026', reason: 'ребёнок бросил курс СИАС после 4 из 10 занятий', status: 'idle' },
      { name: 'Магомед К.', lastVisit: 'июл 2026', reason: 'после PRP колена не пришёл на контрольный осмотр', status: 'idle' },
      { name: 'Заира М.', lastVisit: 'апр 2026', reason: 'просила напомнить о повторной ФГДС через полгода', status: 'idle' },
    ],
    handoff: false,
    channel: 'web',
    mode: 'script',
    updatedTs: Date.now(),
  }
}

export function newMsg(p: Omit<Msg, 'id' | 'ts'>): Msg {
  return { id: id(), ts: Date.now(), ...p }
}

export type AssistantAction = {
  text?: string
  channel?: ConvState['channel']
  leadUpdate?: Partial<ConvState['lead']>
  booking?: { service: string; doctor: string; datetime: string }
  handoff?: boolean
  reactivationUpdate?: { index: number; status: ConvState['reactivation'][number]['status'] }
}

// Единая логика применения ответа ассистента (используют и live-мост, и фолбэк-сценарий).
export function applyAssistantAction(s: ConvState, a: AssistantAction): ConvState {
  const channel = a.channel ?? s.channel
  s.messages.forEach((m) => {
    if (m.role === 'client' && !m.answered) m.answered = true
  })
  if (a.text?.trim()) {
    s.messages.push(newMsg({ role: 'assistant', text: a.text.trim(), channel, answered: true }))
  }
  if (a.leadUpdate) {
    s.lead = { ...s.lead, ...a.leadUpdate }
  }
  if (a.handoff != null) {
    s.handoff = a.handoff
    if (a.handoff) s.lead.stage = 'handoff'
  }
  if (a.reactivationUpdate && s.reactivation[a.reactivationUpdate.index]) {
    s.reactivation[a.reactivationUpdate.index].status = a.reactivationUpdate.status
  }
  if (a.booking) {
    s.booking = { ...a.booking, createdTs: Date.now() }
    s.lead.stage = 'booked'
    s.lead.qualified = true
    s.reminders = (['24h', '12h', '3h', '1h'] as const).map<Reminder>((o) => ({
      offset: o,
      label: `Напоминание за ${o.replace('h', ' ч')} до приёма`,
      sent: false,
    }))
  }
  return s
}
