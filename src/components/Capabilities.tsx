import { useState } from "react";
import CollageShowcase from "@/components/CollageShowcase";
import { useI18n } from "@/i18n/context";

const Capabilities = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useI18n();
  const capabilities = t<{ title: string; text: string }[]>("capabilities.items");
  const icons = ["✦", "◈", "◎", "⬡"];

  return (
    <section id="capabilities" className="py-32 bg-secondary text-secondary-foreground">
      <div className="section-container">
        <div className="mb-20" data-animate="fade-up">
          <span className="label-text text-primary mb-4 block">{t("capabilities.label")}</span>
          <h2 className="headline-medium">
            {t("capabilities.title")}
            <br />
            <span className="text-primary">{t("capabilities.titleHighlight")}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Capability list */}
          <div className="space-y-2" data-animate="stagger">
            {capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className={`group cursor-pointer border-b border-border transition-all duration-300 ${
                  activeIndex === index ? "pb-8" : "pb-4"
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
                          : "text-muted-foreground"
                      }`}
                    >
                    {icons[index]}
                    </span>
                    <h3
                      className={`font-display text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                    {cap.title}
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
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeIndex === index
                      ? "max-h-32 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="body-regular text-muted-foreground pl-10">
                    {cap.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Visual display */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32">
              <div className="relative w-full aspect-square">
                {/* Background shape */}
                <div className="absolute inset-0 bg-muted rounded-3xl" />

                {/* Active capability visual */}
                <div className="absolute inset-8 bg-secondary rounded-2xl flex items-center justify-center overflow-hidden">
                  <span
                    className="text-[180px] text-primary opacity-20 transition-all duration-500"
                    key={activeIndex}
                  >
                    {icons[activeIndex]}
                  </span>
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

        <CollageShowcase embedded showIntro={false} />
      </div>
    </section>
  );
};

export default Capabilities;
