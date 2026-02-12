import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroImage1 from "@/assets/work/work-1.jpg";
import heroImage2 from "@/assets/work/work-2.jpg";
import heroImage3 from "@/assets/work/work-3.jpg";
import { scrollToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

const Hero = () => {
  const collageRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    // Collage entrance animation (keep visible from first paint)
    if (collageRef.current) {
      const images = collageRef.current.querySelectorAll(".collage-image");
      gsap.fromTo(
        images,
        { opacity: 1, scale: 0.96, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center">
      <div className="section-container w-full pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="relative z-10">
            <span className="label-text text-primary mb-3 block">{t("hero.label")}</span>
            <h1
              className="headline-large mb-8"
            >
              {t("hero.headline")}
            </h1>

            <p className="body-large text-muted-foreground max-w-lg mb-10">
              {t("hero.description")}
            </p>

            {/* CTA Buttons Container - Clean layout with proper spacing */}
            <div className="relative">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => scrollToSection("#contact")}
                >
                  {t("hero.ctaStart")}
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  onClick={() => scrollToSection("#work")}
                >
                  {t("hero.ctaWork")}
                </Button>
              </div>
              
              {/* Badge positioned outside button flow - only on large screens */}
              <div className="hidden xl:flex absolute -right-8 top-1/2 -translate-y-1/2 items-center justify-center">
                <div className="sticker w-20 h-20 text-xs">
                  ✦ {t("hero.badgeNew")}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Collage */}
          <div ref={collageRef} className="relative h-[600px] lg:h-[700px]">
            {/* Main image */}
            <div
              className="collage-image absolute top-0 right-0 w-[85%] h-[60%] rounded-2xl overflow-hidden shadow-2xl"
              style={{ transform: "rotate(3deg)" }}
            >
              <img
                src={heroImage1}
                alt={t("hero.collageAlt1")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary image */}
            <div
              className="collage-image absolute bottom-20 left-0 w-[50%] h-[45%] rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: "rotate(-5deg)" }}
            >
              <img
                src={heroImage2}
                alt={t("hero.collageAlt2")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tertiary image */}
            <div
              className="collage-image absolute bottom-0 right-10 w-[45%] h-[35%] rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: "rotate(2deg)" }}
            >
              <img
                src={heroImage3}
                alt={t("hero.collageAlt3")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-primary rounded-full animate-bounce-subtle" />
            <div
              className="absolute bottom-40 right-0 text-6xl animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              😎
            </div>
            <div
              className="absolute top-40 right-20 text-4xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
