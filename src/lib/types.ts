export type Channel = 'web' | 'whatsapp'
export type Role = 'client' | 'assistant'
export type Stage = 'new' | 'qualifying' | 'qualified' | 'booked' | 'handoff'
export type Urgency = 'low' | 'med' | 'high'

export type Msg = {
  id: string
  role: Role
  text: string
  ts: number
  channel: Channel
  answered: boolean
}

export type Lead = {
  name?: string
  phone?: string
  service?: string
  urgency?: Urgency
  qualified: boolean
  stage: Stage
}

export type Booking = {
  service: string
  doctor: string
  datetime: string
  createdTs: number
} | null

export type Reminder = {
  offset: '24h' | '12h' | '3h' | '1h'
  label: string
  sent: boolean
}

export type ReactivationItem = {
  name: string
  lastVisit: string
  reason: string
  status: 'idle' | 'messaged' | 'replied' | 'booked'
}

export type ConvState = {
  messages: Msg[]
  lead: Lead
  booking: Booking
  reminders: Reminder[]
  reactivation: ReactivationItem[]
  handoff: boolean
  channel: Channel
  mode: 'live' | 'script'
  updatedTs: number
}
