import { CLINIC } from '@/lib/clinic'
import { Waves } from '@/components/site/Decor'
import { asset } from '@/lib/asset'
import { LEGAL_ORG } from '@/lib/legal'

const DOCS = 'https://sarrinoj-glitch.github.io/orto-recovery-full/dokumenty/'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative isolate overflow-hidden bg-graphite text-white/70">
      {/* Предупреждение для рекламы медицинских услуг (ч. 7 ст. 24 38-ФЗ) */}
      <div className="bg-lime px-4 py-4 text-center text-graphite sm:py-5">
        <p className="text-[15px] font-extrabold uppercase tracking-[0.04em] sm:text-xl">Имеются противопоказания. Необходима консультация специалиста</p>
      </div>
      <Waves className="-top-6 left-0 -z-10 h-32 w-full" opacity={0.25} />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <img src={asset('/logo-color.png')} alt="Орто-Рекавери" className="h-16 w-auto self-start" />
        <div className="space-y-1.5 text-[15px]">
          <p className="text-white">{CLINIC.address}</p>
          <p>{CLINIC.hoursWeek}, {CLINIC.hoursSat}</p>
          <p>
            <a href={`tel:${CLINIC.phone.replace(/[^\d+]/g, '')}`} className="text-white hover:underline">
              {CLINIC.phone}
            </a>
          </p>
        </div>
        <div className="space-y-1.5 text-sm">
          <p>{CLINIC.legal}</p>
          <p>ИНН {CLINIC.inn}</p>
          <p>ОГРН {CLINIC.ogrn}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-[13px] leading-relaxed text-white/45 sm:px-6">
          <p className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-white/80">
            {[['svedeniya', 'Сведения о центре и лицензия'], ['vrachi', 'Сведения о врачах'], ['platnye-uslugi', 'Условия платных услуг'], ['dogovor', 'Образец договора'], ['politika', 'Политика обработки ПДн'], ['soglasie', 'Согласие на обработку ПДн'], ['cookie', 'Политика cookie'], ['kontroliruyushchie-organy', 'Контролирующие органы']].map(([s, t]) => (
              <a key={s} href={`${DOCS}${s}/`} className="underline underline-offset-2 hover:text-white">{t}</a>
            ))}
          </p>
          <p>{LEGAL_ORG.full} (ОГРН {LEGAL_ORG.ogrn}, ИНН {LEGAL_ORG.inn}). Адрес: {LEGAL_ORG.address}. Лицензия на медицинскую деятельность № {LEGAL_ORG.license_no} от {LEGAL_ORG.license_date}, выдана: {LEGAL_ORG.license_body}. Электронная почта для обращений: <a href={`mailto:${LEGAL_ORG.email}`} className="underline hover:text-white">{LEGAL_ORG.email}</a>. Информация на сайте не является публичной офертой и не заменяет консультацию врача. © {year}. Демо-версия сайта, подготовлена для обсуждения с центром.</p>
        </div>
      </div>
    </footer>
  )
}
