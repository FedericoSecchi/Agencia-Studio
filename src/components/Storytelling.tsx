const mainLine =
  "We design brand identities and websites that clarify positioning and help teams sell with confidence.";

const sideCopy =
  "A small studio focused on clear strategy, strong identity, and practical delivery.";

const Storytelling = () => {
  return (
    <section
      id="about"
      className="about-section min-h-[90vh] relative bg-background px-[6vw]"
      aria-labelledby="about-intro-heading"
    >
      <div className="about-main-wrapper">
        <div className="about-main centered-text w-full max-w-none mx-auto space-y-4">
          <span className="label-text text-primary mb-4 block text-center">ABOUT</span>
          <h2
            id="about-intro-heading"
            className="font-display font-extrabold leading-[0.95] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(3.75rem, 10vw, 12rem)",
              lineHeight: "0.95",
              maxWidth: "min(94vw, 90rem)",
              marginInline: "auto",
            }}
          >
            {mainLine}
          </h2>
        </div>
      </div>

      <div className="about-note text-muted-foreground">
        {sideCopy}
      </div>
    </section>
  );
};

export default Storytelling;
