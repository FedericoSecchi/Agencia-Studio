import ScrollFloat from "./ScrollFloat";

const mainLine =
  "We craft brands and digital experiences built to spark emotion, sharpen identity, and make people feel \"this is it.\"";

const sideCopy = "A studio driven by clarity, bold ideas, and design that actually works.";

const Storytelling = () => {
  return (
    <section className="about-section min-h-[90vh] relative bg-background px-[6vw]">
      <div className="about-main-wrapper">
        <div className="about-main centered-text w-full max-w-[900px] mx-auto space-y-4">
          <ScrollFloat
            containerClassName=""
            textClassName="font-display font-extrabold leading-[0.95] tracking-[-0.02em]"
          >
            {mainLine}
          </ScrollFloat>
        </div>
      </div>

      <div className="about-note text-muted-foreground">
        {sideCopy}
      </div>
    </section>
  );
};

export default Storytelling;
