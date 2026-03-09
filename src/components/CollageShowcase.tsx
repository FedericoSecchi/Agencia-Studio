import { useI18n } from "@/i18n/context";
import heroImage1 from "@/assets/work/work-1.jpg";
import heroImage2 from "@/assets/work/work-2.jpg";
import heroImage3 from "@/assets/work/work-3.jpg";

const CollageShowcase = () => {
  const { t } = useI18n();
  return (
    <section className="py-16 lg:py-24 xl:py-32 bg-white text-foreground overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12 lg:mb-16 xl:mb-20" data-animate="fade-up">
          <h2 className="headline-medium mb-4">
            {t("gallery.headline")}
          </h2>
          <p className="body-large text-muted-foreground max-w-xl mx-auto">
            {t("gallery.subtext")}
          </p>
        </div>

        {/* Collage Grid — studio photos (reusing hero images) */}
        <div className="relative h-[800px] lg:h-[900px] isolate" data-animate="scale">
            {/* Large image */}
            <div
              className="collage-card absolute top-0 left-0 w-[60%] lg:w-[45%] h-[45%] rounded-2xl overflow-hidden shadow-2xl block"
              style={{ transform: "rotate(-2deg)" }}
              data-parallax="0.1"
            >
              <img
                src={heroImage1}
                alt={t("hero.collageAlt1")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Medium image right */}
            <div
              className="collage-card absolute top-10 right-0 w-[50%] lg:w-[40%] h-[35%] rounded-2xl overflow-hidden shadow-xl block"
              style={{ transform: "rotate(4deg)" }}
              data-parallax="0.15"
            >
              <img
                src={heroImage2}
                alt={t("hero.collageAlt2")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Small image center */}
            <div
              className="collage-card absolute top-[40%] left-[30%] w-[35%] lg:w-[25%] h-[30%] rounded-2xl overflow-hidden shadow-xl z-10 block"
              style={{ transform: "rotate(-1deg)" }}
              data-parallax="0.2"
            >
              <img
                src={heroImage3}
                alt={t("hero.collageAlt3")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Bottom left */}
            <div
              className="collage-card absolute bottom-20 left-10 w-[45%] lg:w-[35%] h-[35%] rounded-2xl overflow-hidden shadow-xl block"
              style={{ transform: "rotate(3deg)" }}
              data-parallax="0.08"
            >
              <img
                src={heroImage1}
                alt={t("hero.collageAlt1")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Bottom right decorative card */}
            <div
              className="absolute bottom-10 right-20 w-[30%] lg:w-[20%] h-[25%] bg-primary rounded-2xl flex items-center justify-center"
              style={{ transform: "rotate(-5deg)" }}
            >
              <span className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground">
                ✦
              </span>
            </div>

            {/* Floating elements — low z-index so they don't overlap Works section below */}
            <div
              className="absolute top-[5%] lg:top-[15%] xl:top-[20%] right-[30%] text-5xl animate-float z-0"
              style={{ animationDelay: "0.3s" }}
            >
              👀
            </div>
            <div
              className="absolute bottom-[40%] left-[80%] lg:left-[70%] text-4xl animate-float z-0"
              style={{ animationDelay: "0.8s" }}
            >
              🌟
            </div>
          </div>
      </div>
    </section>
  );
};

export default CollageShowcase;
