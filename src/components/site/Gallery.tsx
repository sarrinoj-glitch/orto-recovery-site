'use client'

import HoverExpand from '@/components/ui/hover-expand'
import { PHOTOS } from '@/lib/clinic'

export function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em] text-graphite sm:text-[2rem]">Так выглядит центр внутри</h2>
        <p className="text-[15px] text-graphite/55">Фотографии из карточки центра в 2ГИС</p>
      </div>
      <div className="mt-6">
        <HoverExpand items={PHOTOS} orientation="horizontal" showLabelsWhenCollapsed={false} className="hidden h-[440px] md:flex" />
        <HoverExpand items={PHOTOS} orientation="vertical" showLabelsWhenCollapsed={false} className="md:hidden" />
      </div>
    </section>
  )
}
