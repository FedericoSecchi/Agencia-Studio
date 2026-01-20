const mainLine =
  "We design brand identities and websites that clarify positioning and help teams sell with confidence.";

const sideCopy =
  "A small studio focused on clear strategy, strong identity, and practical delivery.";

const Storytelling = () => {
  return (
    <section
      id="about"
      className="about-section min-h-[90vh] relative bg-background px-[6vw] overflow-x-clip"
      aria-labelledby="about-intro-heading"
    >
      <div
        className="about-main-wrapper grid"
        style={{ rowGap: "clamp(1.75rem, 3vw, 4.5rem)" }}
      >
        <div className="about-main centered-text w-full max-w-none mx-auto">
          <span className="label-text text-primary mb-4 block text-center">ABOUT</span>
          <div className="about-headline-clip overflow-hidden">
            <h2
              id="about-intro-heading"
              className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] block"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 12rem)",
                lineHeight: "clamp(1.02, 0.92 + 0.3vw, 1.14)",
                width: "100vw",
                maxWidth: "none",
                margin: "0",
                padding: "0",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
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
