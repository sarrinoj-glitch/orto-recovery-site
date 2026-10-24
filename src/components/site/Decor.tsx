import clsx from 'clsx'
import type { ReactNode } from 'react'

// Фирменные мотивы из брендбука «Орто-Рекавери»: волнистые линии и концентрические круги

export function Waves({ className, color = '#48F6FF', opacity = 0.6 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className={clsx('pointer-events-none absolute', className)}
      fill="none"
      style={{ opacity }}
    >
      <path d="M0 150 C 140 40, 260 40, 400 130 S 660 230, 800 90" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M0 175 C 160 70, 280 80, 410 155 S 650 235, 800 125" stroke="#177E96" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 196 C 150 110, 300 115, 420 180 S 640 230, 800 160" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export function Rings({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx('pointer-events-none absolute', className)}>
      <div className="absolute inset-0 rounded-full border-[14px] border-neon/40" />
      <div className="absolute inset-[12%] rounded-full bg-teal/10" />
      <div className="absolute inset-[24%] rounded-full border-[6px] border-teal/25" />
    </div>
  )
}

// Рукописная пометка со стрелкой — как записка администратора
export function HandNote({
  children,
  className,
  arrow = 'down-left',
  color = 'text-teal',
}: {
  children: ReactNode
  className?: string
  arrow?: 'down-left' | 'down-right' | 'left' | 'none'
  color?: string
}) {
  const paths: Record<string, string> = {
    'down-left': 'M70 6 C 60 30, 40 44, 10 50 M10 50 L 22 40 M10 50 L 24 56',
    'down-right': 'M10 6 C 20 30, 40 44, 70 50 M70 50 L 58 40 M70 50 L 56 56',
    left: 'M76 30 C 56 18, 30 18, 8 30 M8 30 L 20 20 M8 30 L 20 40',
  }
  return (
    <div aria-hidden className={clsx('pointer-events-none absolute flex items-start gap-1 font-hand leading-[1.05]', color, className)}>
      {arrow !== 'none' && arrow !== 'down-right' && (
        <svg viewBox="0 0 80 60" className="mt-3 h-10 w-14 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d={paths[arrow]} />
        </svg>
      )}
      <span className="max-w-[13rem] text-[1.45rem] font-bold">{children}</span>
      {arrow === 'down-right' && (
        <svg viewBox="0 0 80 60" className="mt-3 h-10 w-14 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d={paths[arrow]} />
        </svg>
      )}
    </div>
  )
}

export function Sticker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center rounded-full bg-lime text-center text-graphite shadow-lift', className)}>
      {children}
    </div>
  )
}
