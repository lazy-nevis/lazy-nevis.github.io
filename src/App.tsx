import { AboutSection } from '@/components/sections/AboutSection'
import { ContributeSection } from '@/components/sections/ContributeSection'
import { FaqSection } from '@/components/sections/FaqSection'
import {
  FeaturesSection,
  HowItWorksSection,
} from '@/components/sections/FeaturesSection'
import { Hero } from '@/components/sections/Hero'
import { InstallSection } from '@/components/sections/InstallSection'
import { ScreenshotsSection } from '@/components/sections/ScreenshotsSection'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { JsonLd } from '@/components/seo/JsonLd'

function App() {
  return (
    <>
      <JsonLd />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InstallSection />
        <ScreenshotsSection />
        <ContributeSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}

export default App
