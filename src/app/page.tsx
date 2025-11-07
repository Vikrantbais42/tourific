import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import TourPlanner from '@/components/tour-planner';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TourPlanner />
      </main>
      <Footer />
    </>
  );
}
