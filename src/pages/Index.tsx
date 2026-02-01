import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import Process from "@/components/Process";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Clients from "@/components/Clients";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";

const Index = () => {
  const { t, language } = useI18n();
  useScrollAnimations();
  useEffect(() => {
    // Update page title
    document.title = t("meta.homeTitle");
    const description = t("meta.homeDescription");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      const metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      metaTag.setAttribute("content", description);
      document.head.appendChild(metaTag);
    }
  }, [language, t]);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Storytelling />
        <Process />
        <Marquee />
        <div className="py-12 bg-secondary text-secondary-foreground">
          <div className="section-container">
            <div className="label-text text-primary uppercase text-center font-medium">
              What we do → How it looks in the real world
            </div>
          </div>
        </div>
        <Capabilities />
        <Portfolio />
        <Clients />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
