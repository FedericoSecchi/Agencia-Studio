import { useI18n } from "@/i18n/context";

const Storytelling = () => {
  const { t } = useI18n();
  return (
    <section
      id="about"
      className="about-section min-h-[70vh] relative bg-background overflow-x-clip"
      aria-labelledby="about-intro-heading"
    >
      <div
        className="about-main-wrapper grid"
        style={{ rowGap: "0" }}
      >
        <div
          className="about-main w-full"
          style={{ position: "relative", isolation: "isolate" }}
        >
          <span
            className="label-text text-primary mb-4 block text-center"
            style={{ paddingInline: "clamp(1.25rem, 6vw, 6rem)" }}
          >
            {t("about.label")}
          </span>
          <h2
            id="about-intro-heading"
            className="headline-large text-center"
            style={{
              width: "90vw",
              maxWidth: "1600px",
              margin: "0 auto",
              padding: "0",
              boxSizing: "border-box",
            }}
          >
            {t("about.mainLine")}
          </h2>
          <div
            className="about-note text-muted-foreground w-full text-center"
            style={{
              paddingInline: "clamp(1.25rem, 6vw, 6rem)",
              marginTop: "clamp(1.5rem, 3vw, 3rem)",
              marginBottom: "clamp(2rem, 4vw, 4rem)",
            }}
          >
            {t("about.note")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
