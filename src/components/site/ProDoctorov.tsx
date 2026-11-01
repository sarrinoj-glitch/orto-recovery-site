'use client'

import { useEffect, useRef, useState } from 'react'

// Виджет ПроДокторов грузится только по кнопке: отзывы показывает независимая площадка
// по запросу посетителя (ч. 3 ст. 24 38-ФЗ), и её cookie появляются только после клика.
// Разметку собираем вручную: скрипт площадки сам заменяет содержимое блока.
const LPU = '90155'
const SRC = 'https://prodoctorov.ru/static/js/widget_big.js?v07'
const PAGE = 'https://prodoctorov.ru/mahachkala/lpu/90155-orto-rekaveri/#otzivi'

type State = 'idle' | 'loading' | 'ready' | 'failed'

export function ProDoctorovWidget() {
  const [state, setState] = useState<State>('idle')
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state !== 'loading' || !box.current) return
    const el = document.createElement('div')
    el.id = 'pd_widget_big'
    el.dataset.lpu = LPU
    el.hidden = true
    // Скрипт берёт домен API из первой ссылки внутри блока
    el.innerHTML = `<a target="_blank" rel="noreferrer" href="${PAGE}">Отзывы о клинике «Орто-Рекавери»</a>`
    box.current.appendChild(el)
    const observer = new MutationObserver(() => { if (!el.hidden) setState('ready') })
    observer.observe(el, { attributes: true, attributeFilter: ['hidden'] })
    const timer = window.setTimeout(() => { if (el.hidden) setState('failed') }, 10000)
    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.onerror = () => setState('failed')
    document.body.appendChild(script)
    return () => { observer.disconnect(); window.clearTimeout(timer); script.remove() }
  }, [state])

  if (state === 'idle') {
    return (
      <button type="button" onClick={() => setState('loading')} className="h-11 self-start rounded-full bg-deep px-5 text-[15px] font-semibold text-white">
        Показать отзывы с ПроДокторов
      </button>
    )
  }
  return (
    <div>
      <div ref={box} />
      {state === 'loading' && <div className="h-40 animate-pulse rounded-2xl bg-graphite/5" aria-label="Загружаем отзывы" />}
      {state === 'failed' && (
        <p className="text-[15px] text-graphite/70">
          Не удалось загрузить виджет.{' '}
          <a href={PAGE} target="_blank" rel="noreferrer" className="text-teal underline underline-offset-2">Открыть отзывы на ПроДокторов</a>
        </p>
      )}
    </div>
  )
}
