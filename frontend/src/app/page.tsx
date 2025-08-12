import { Header } from '@/components/Home/Header'
import { Footer } from '@/components/Home/Footer'
import { FeaturesSection } from '@/components/Home/FeaturesSection'
import { SolutionsSection } from '@/components/Home/SolutionsSection'
import { HeroSection } from '@/components/Home/HeroSection'
import { CTASection } from '@/components/Home/CTASection'

export default function KerjaKitaProfessional() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}