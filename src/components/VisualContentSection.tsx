import { useI18n } from "@/i18n/context";

const VisualContentSection = () => {
  const { t } = useI18n();
  const services = t<string[]>("visualContent.services");

  return (
    <section
      id="visual-content"
      className="py-16 lg:py-24 xl:py-32 bg-background text-foreground"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div className="space-y-6" data-animate="fade-up">
            <span className="label-text text-primary block">
              {t("visualContent.label")}
            </span>
            <h2 className="headline-medium">{t("visualContent.title")}</h2>
            <p className="body-large text-muted-foreground">
              {t("visualContent.description")}
            </p>
            <ul className="space-y-2">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-primary">✦</span>
                  <span className="body-large">{service}</span>
                </li>
              ))}
            </ul>
            <p className="body-regular text-muted-foreground text-sm">
              {t("visualContent.note")}
            </p>
          </div>

          {/* Right: Video embed */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted" data-animate="fade-up">
            <video
              src="/videos/video-dji.mp4"
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label={t("visualContent.videoLabel")}
            >
              <track kind="captions" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualContentSection;
