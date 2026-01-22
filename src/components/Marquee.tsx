import { useI18n } from "@/i18n/context";

const Marquee = () => {
  const { t } = useI18n();
  const items = t<string[]>("services.items");
  return (
    <section className="py-12 bg-secondary overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-6">
          <span className="label-text text-primary mb-2 block">{t("services.label")}</span>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-secondary-foreground/80">
            {t("services.title")}
          </h2>
        </div>
      </div>
      <div className="flex">
        <div className="marquee-track">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span
              key={i}
              className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground/20 flex items-center gap-12"
            >
              {item}
              <span className="text-primary text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
