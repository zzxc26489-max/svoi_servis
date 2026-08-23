import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Prices from "@/components/Prices";
import HowItWorks from "@/components/HowItWorks";
import Works from "@/components/Works";
import Reviews from "@/components/Reviews";
import Advantages from "@/components/Advantages";
import OrderSection from "@/components/OrderSection";
import Faq from "@/components/Faq";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Prices />
        <HowItWorks />
        <Works />
        <Reviews />
        <Advantages />
        <OrderSection />
        <Faq />
      </main>
      <CtaStrip />
      <Footer />
    </>
  );
}
