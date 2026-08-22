import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Prices from "@/components/Prices";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import OrderSection from "@/components/OrderSection";
import Faq from "@/components/Faq";
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
        <Advantages />
        <OrderSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
