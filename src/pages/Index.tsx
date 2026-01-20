import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import CollageShowcase from "@/components/CollageShowcase";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Clients from "@/components/Clients";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  useEffect(() => {
    // Update page title
    document.title = "Creative Studio — Branding, Websites & Experiences";
  }, []);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Storytelling />
        <Process />
        <Marquee />
        <CollageShowcase />
        <Portfolio />
        <Capabilities />
        <Clients />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
