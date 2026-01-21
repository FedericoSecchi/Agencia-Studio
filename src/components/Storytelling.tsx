const mainLine =
  "We design brand identities and websites that clarify positioning and help teams sell with confidence.";

const sideCopy =
  "A small studio focused on clear strategy, strong identity, and practical delivery.";

const Storytelling = () => {
  return (
    <section
      id="about"
      className="about-section min-h-[90vh] relative bg-background overflow-x-clip"
      aria-labelledby="about-intro-heading"
    >
      <div
        className="about-main-wrapper grid"
        style={{ rowGap: "0" }}
      >
        <div className="about-main w-full">
          <span
            className="label-text text-primary mb-4 block text-center"
            style={{ paddingInline: "clamp(1.25rem, 6vw, 6rem)" }}
          >
            ABOUT
          </span>
          <div className="about-headline-clip overflow-hidden">
            <h2
              id="about-intro-heading"
              className="font-display font-extrabold tracking-[-0.02em] text-center"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 11.5rem)",
                lineHeight: "1.05",
                width: "100%",
                maxWidth: "100%",
                margin: "0",
                padding: "0",
                textWrap: "balance",
                hyphens: "auto",
                overflowWrap: "break-word",
                boxSizing: "border-box",
              }}
            >
              {mainLine}
            </h2>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{ height: "clamp(2.5rem, 6vw, 6rem)" }}
        />

        <div
          className="about-note text-muted-foreground w-full text-center"
          style={{ paddingInline: "clamp(1.25rem, 6vw, 6rem)" }}
        >
          {sideCopy}
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
