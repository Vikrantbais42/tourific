import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import TourPlanner from '@/components/tour-planner';
import HowItWorks from '@/components/how-it-works';
import FeaturesSection from '@/components/features-section';
// import PopularDestinations from '@/components/popular-destinations';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TourPlanner />
        <HowItWorks />
        {/* <PopularDestinations /> */}
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
