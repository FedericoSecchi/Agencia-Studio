import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/context";

const SERVICE_KEYS = ["branding", "websites", "content", "systems"] as const;
const SERVICE_SLUGS: Record<(typeof SERVICE_KEYS)[number], string> = {
  branding: "branding",
  websites: "websites",
  content: "content-motion",
  systems: "systems-automation",
};

const Capabilities = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useI18n();
  const icons = ["✦", "◈", "◎", "⬡"];

  return (
    <section id="services" className="py-16 lg:py-24 xl:py-32 bg-secondary text-secondary-foreground">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
          {/* Left: Title + Capability list */}
          <div className="space-y-10" data-animate="fade-up">
            <div>
              <span className="label-text text-primary mb-4 block">
                {t("services.label")}
              </span>
              <h2 className="headline-medium">
                {t("services.title")}
              </h2>
            </div>

            <div className="space-y-2" data-animate="stagger">
              {SERVICE_KEYS.map((key, index) => {
                const title = t(`services.${key}.title`);
                const description = t(`services.${key}.description`);
                const hasDetail = Boolean(description);
                return (
                  <div
                    key={key}
                    className={`group cursor-pointer border-b border-border transition-all duration-300 ${
                      activeIndex === index && hasDetail ? "pb-10" : "pb-4"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-2xl transition-transform duration-300 ${
                            activeIndex === index
                              ? "scale-125 text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }`}
                        >
                          {icons[index]}
                        </span>
                        <h3
                          className={`font-display text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                            activeIndex === index
                              ? "text-background"
                              : "text-muted-foreground"
                          }`}
                        >
                          {title}
                        </h3>
                      </div>
                      <span
                        className={`text-2xl transition-transform duration-300 ${
                          activeIndex === index ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </div>

                    {/* Expandable content */}
                    {hasDetail && (
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeIndex === index
                            ? (key === "content" ? "max-h-64" : "max-h-44") + " opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p
                          className={`body-large pl-10 ${
                            activeIndex === index
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }`}
                        >
                          {description}
                          {key === "content" && (
                            <>
                              {" "}
                              {t("services.content.noteBefore")}
                              <a
                                href="https://federicosecchi.github.io/Skyshot-Web/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {t("services.content.noteLink")}
                              </a>
                              {t("services.content.noteAfter")}
                            </>
                          )}
                        </p>
                        <Link
                          to={`/services/${SERVICE_SLUGS[key]}`}
                          className="inline-block pl-10 mt-3 text-sm font-medium text-primary hover:underline"
                        >
                          {t("services.viewProjects")} →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Visual display */}
          <div className="relative mt-12 lg:mt-0 flex justify-center lg:block h-full">
            <div className="lg:sticky lg:top-32 h-full w-full max-w-md lg:max-w-none">
              <div className="block relative w-full aspect-square lg:h-full lg:aspect-square lg:max-w-full">
                {/* Background shape */}
                <div className="absolute inset-0 bg-muted rounded-3xl" />

                {/* Mobile: muted block (no video) */}
                <div className="absolute inset-0 bg-muted rounded-3xl lg:hidden" />

                {/* Active capability visual — Content & Motion shows drone video when section open (desktop only) */}
                <div
                  className="absolute inset-8 bg-secondary rounded-2xl flex items-center justify-center overflow-hidden hidden lg:flex"
                  data-state={activeIndex === 2 ? "open" : "closed"}
                >
                  {activeIndex === 2 ? (
                    <>
                      <video
                        id="drone-video"
                        src="/videos/video-dji.mp4"
                        className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                      />
                      <span
                        id="motion-icon"
                        className="absolute inset-0 flex items-center justify-center text-[180px] text-primary opacity-20 transition-opacity duration-500"
                      >
                        ◎
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-[180px] text-primary opacity-20 transition-all duration-500"
                      key={activeIndex}
                    >
                      {icons[activeIndex]}
                    </span>
                  )}
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-full font-display font-bold">
                  0{activeIndex + 1}
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Capabilities;
