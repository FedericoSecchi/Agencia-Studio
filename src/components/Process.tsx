import { scrollToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

const Process = () => {
  const { t } = useI18n();
  const steps = t<{ title: string; description: string }[]>("process.steps");
  return (
    <section
      id="proceso"
      className="pt-16 md:pt-24 lg:pt-32 pb-32 bg-neutral-950 text-white border-t border-white/10"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Main statement */}
          <div>
            <span className="label-text text-primary mb-4 block">
              {t("process.label")}
            </span>
            <h2 id="process-heading" className="headline-medium mb-8 max-w-3xl">
              {t("process.headline_line_1")}
              <br />
              <span className="text-stroke">{t("process.headline_line_2")}</span>
            </h2>

            <p className="body-large text-neutral-400 max-w-lg">
              {t("process.intro")}
            </p>
          </div>

          {/* Right: Steps */}
          <div>
            <span className="label-text text-primary mb-8 block">
              {t("process.list_label")}
            </span>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 items-start process-step"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="pt-1.5">
                    <p className="body-large process-step-title">{step.title}</p>
                    <p className="process-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contacto");
              }}
              className="mt-12 inline-flex items-center gap-3 bg-white text-neutral-950 px-6 py-4 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors animate-heartbeat"
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
