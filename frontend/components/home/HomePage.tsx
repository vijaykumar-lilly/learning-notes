import HomeHeader from '@/components/home/HomeHeader'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import SubjectsSection from '@/components/home/SubjectsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import HomeFooter from '@/components/home/HomeFooter'

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="min-h-screen pt-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SubjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <HomeFooter />
    </>
  )
}
