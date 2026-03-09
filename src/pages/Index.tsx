import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import Process from "@/components/Process";
import CollageShowcase from "@/components/CollageShowcase";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Clients from "@/components/Clients";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

const Index = () => {
  const { t } = useI18n();
  useScrollAnimations();

  return (
    <div className="relative">
      <SEO
        title={t("meta.homeTitle")}
        description={t("meta.homeDescription")}
        url={`${SITE_URL}/`}
        image={`${SITE_URL}/branding/og-image.jpg`}
        imageWidth={1200}
        imageHeight={630}
        type="website"
      />
      <Header />
      <main>
        <Hero />
        <Clients />
        <Capabilities />
        <Portfolio />
        <Process />
        <Storytelling />
        <CollageShowcase />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
