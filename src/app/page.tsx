import { Header } from '@/components/site/Header'
import { HeroLive } from '@/components/site/HeroLive'
import { Doctors } from '@/components/site/Doctors'
import { Gallery } from '@/components/site/Gallery'
import { Prices } from '@/components/site/Prices'
import { FirstVisit } from '@/components/site/FirstVisit'
import { ForFamily } from '@/components/site/ForFamily'
import { Visit } from '@/components/site/Visit'
import { Faq } from '@/components/site/Faq'
import { Reviews } from '@/components/site/Reviews'
import { Endoscopy } from '@/components/site/Endoscopy'
import { Savings } from '@/components/site/Savings'
import { Procedures } from '@/components/site/Procedures'
import { HomeVisit } from '@/components/site/HomeVisit'
import { Footer } from '@/components/site/Footer'
import { RevealObserver } from '@/components/site/RevealObserver'
import ChatWidget from '@/components/ChatWidget'

export default function HomePage() {
  return (
    <div className="overflow-x-clip bg-white text-graphite">
      <Header />
      <HeroLive />
      <main>
        <Reviews />
        <Doctors />
        <Endoscopy />
        <Gallery />
        <Procedures />
        <Prices />
        <Savings />
        <FirstVisit />
        <HomeVisit />
        <ForFamily />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <ChatWidget />
      <RevealObserver />
    </div>
  )
}
