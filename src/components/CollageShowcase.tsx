import { Link } from "react-router-dom";
import { getProjectById } from "@/data/projects";
import { useI18n } from "@/i18n/context";

const securityAllianceImage = getProjectById("security-alliance")?.image ?? "";
const theRedGuildImage = getProjectById("the-red-guild")?.image ?? "";
const orbitaImage = getProjectById("orbita")?.image ?? "";

const collageProjectMap: Record<string, string> = {
  [theRedGuildImage]: "the-red-guild",
  [orbitaImage]: "orbita",
};

const CollageShowcase = () => {
  const { t } = useI18n();
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-20" data-animate="fade-up">
          <span className="label-text text-primary mb-4 block">{t("work.label")}</span>
          <h2 className="headline-medium mb-4">
            {t("work.collageTitle")}
            <br />
            {t("work.collageSubtitle")}
          </h2>
          <p className="body-large text-muted-foreground max-w-xl mx-auto">
            {t("work.collageDescription")}
          </p>
        </div>

        {/* Collage Grid */}
        <div className="relative h-[800px] md:h-[900px] isolate" data-animate="scale">
            {/* Large image */}
            <Link
              to="/project/security-alliance"
              className="collage-card absolute top-0 left-0 w-[60%] md:w-[45%] h-[45%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer block"
              style={{ transform: "rotate(-2deg)" }}
              data-parallax="0.1"
            >
              <img
                src={securityAllianceImage}
                alt={t("work.collageAltProjectShowcase")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <span className="label-text text-background">{t("work.collageOverlayLabel")}</span>
                  <h3 className="font-display text-xl font-bold text-background">
                    {t("work.collageOverlayTitle")}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Medium image right */}
            <Link
              to={`/project/${collageProjectMap[theRedGuildImage]}`}
              className="collage-card absolute top-10 right-0 w-[50%] md:w-[40%] h-[35%] rounded-2xl overflow-hidden shadow-xl cursor-pointer block"
              style={{ transform: "rotate(4deg)" }}
              data-parallax="0.15"
            >
              <img
                src={theRedGuildImage}
                alt={t("work.collageAltDesignProcess")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </Link>

            {/* Small image center */}
            <Link
              to={`/project/${collageProjectMap[orbitaImage]}`}
              className="collage-card absolute top-[40%] left-[30%] w-[35%] md:w-[25%] h-[30%] rounded-2xl overflow-hidden shadow-xl cursor-pointer z-10 block"
              style={{ transform: "rotate(-1deg)" }}
              data-parallax="0.2"
            >
              <img
                src={orbitaImage}
                alt={t("work.collageAltWebsiteDesign")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              {/* Sticker overlay */}
              <div className="absolute -top-4 -right-4 sticker w-16 h-16 text-xs z-20">
                🔥
              </div>
            </Link>

            {/* Bottom left */}
            <Link
              to="/project/security-alliance"
              className="collage-card absolute bottom-20 left-10 w-[45%] md:w-[35%] h-[35%] rounded-2xl overflow-hidden shadow-xl cursor-pointer block"
              style={{ transform: "rotate(3deg)" }}
              data-parallax="0.08"
            >
              <img
                src={securityAllianceImage}
                alt={t("work.collageAltFeaturedBranding")}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </Link>

            {/* Bottom right decorative card */}
            <div
              className="absolute bottom-10 right-20 w-[30%] md:w-[20%] h-[25%] bg-primary rounded-2xl flex items-center justify-center"
              style={{ transform: "rotate(-5deg)" }}
            >
              <span className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">
                ✦
              </span>
            </div>

            {/* Floating elements — low z-index so they don't overlap Works section below */}
            <div
              className="absolute top-[5%] md:top-[15%] lg:top-[20%] right-[30%] text-5xl animate-float z-0"
              style={{ animationDelay: "0.3s" }}
            >
              👀
            </div>
            <div
              className="absolute bottom-[40%] left-[80%] md:left-[70%] text-4xl animate-float z-0"
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
