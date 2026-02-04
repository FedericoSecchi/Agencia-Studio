import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";

const ContactCTA = () => {
  const { t } = useI18n();
  const email = t("contact.email");
  const handleWriteUs = () => {
    window.location.href = `mailto:${email}?subject=New Project Inquiry`;
  };

  const handleStartBrief = () => {
    window.open("https://placeholder.google.form", "_blank");
  };

  return (
    <section id="contact" className="py-32 bg-background text-foreground relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center" data-animate="fade-up">
          <span className="label-text text-primary mb-4 block">{t("contact.label")}</span>
          <h2 className="headline-medium mb-6">
            {t("contact.title")}
            <br />
            {t("contact.titleEnd")}
          </h2>

          <p className="body-large text-secondary-foreground/70 max-w-2xl mx-auto mb-12">
            {t("contact.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="neon" size="xl" onClick={handleWriteUs}>
              {t("contact.ctaWrite")}
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary opacity-50 cursor-not-allowed"
              onClick={handleStartBrief}
              disabled
            >
              {t("contact.ctaBrief")}
            </Button>
          </div>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 font-display text-xl font-semibold text-primary hover:underline"
          >
            {email}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

      {/* Floating elements */}
      <div
        className="absolute top-32 right-[15%] text-6xl opacity-20 animate-float"
        style={{ animationDelay: "0.3s" }}
      >
        ✦
      </div>
      <div
        className="absolute bottom-32 left-[10%] text-5xl opacity-20 animate-float"
        style={{ animationDelay: "0.7s" }}
      >
        ◈
      </div>
    </section>
  );
};

export default ContactCTA;
