import { scrollToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

const Process = () => {
  const { t } = useI18n();
  const bullets = t<string[]>("process.bullets");
  return (
    <section id="process" className="py-32 bg-muted">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main statement */}
          <div data-animate="fade-up">
            <span className="label-text text-primary mb-4 block">{t("process.label")}</span>
            <h2 className="headline-medium mb-8">
              {t("process.title")}
              <br />
              <span className="text-stroke">{t("process.titleHighlight")}</span>
            </h2>

            <p className="body-large text-muted-foreground max-w-lg">
              {t("process.description")}
            </p>
          </div>

          {/* Right: Bullets */}
          <div data-animate="stagger">
            <span className="label-text text-primary mb-8 block">
              {t("process.clientsAppreciate")}
            </span>

            <div className="space-y-6">
              {bullets.map((bullet, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {index + 1}
                  </div>
                  <p className="body-large pt-1.5">{bullet}</p>
                </div>
              ))}
            </div>

            {/* Decorative sticker */}
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="mt-12 inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-6 py-4 rounded-full cursor-pointer hover:opacity-90 transition-opacity animate-heartbeat"
              type="button"
            >
              <span className="text-2xl">😌</span>
              <span className="font-body font-medium">
                {t("process.cta")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
