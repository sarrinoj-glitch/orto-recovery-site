'use client'

import { useEffect } from 'react'

// Проявление при прокрутке: заголовки секций, [data-reveal] и дети [data-stagger] — по очереди.
// Один раз, без анимации при «уменьшить движение».
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els: HTMLElement[] = []
    document.querySelectorAll<HTMLElement>('main h2, [data-reveal]').forEach((el) => els.push(el))
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((box) => {
      Array.from(box.children).forEach((c, i) => {
        const el = c as HTMLElement
        el.style.setProperty('--d', `${(i * 0.08).toFixed(2)}s`)
        els.push(el)
      })
    })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => { el.classList.add('rv'); io.observe(el) })

    // Свет за курсором на карточках .spot
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.spot')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove)
    return () => { io.disconnect(); document.removeEventListener('pointermove', onMove) }
  }, [])
  return null
}
