import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import Marquee from "@/components/Marquee";
import CollageShowcase from "@/components/CollageShowcase";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Ethos from "@/components/Ethos";
import Clients from "@/components/Clients";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { initAboutAnimations } from "@/animations/aboutAnimations";

const Index = () => {
  useScrollAnimations();

  useEffect(() => {
    const cleanup = initAboutAnimations();
    return () => cleanup?.();
  }, []);

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
        <Marquee />
        <CollageShowcase />
        <Portfolio />
        <Capabilities />
        <Ethos />
        <Clients />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
