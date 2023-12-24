import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
