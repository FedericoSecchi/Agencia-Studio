import { useMemo } from "react";

const mainLine =
  "We craft brands and digital experiences built to spark emotion, sharpen identity, and make people feel “this is it.”";

const sideCopy = "A studio driven by clarity, bold ideas, and design that actually works.";

const Storytelling = () => {
  const words = useMemo(
    () =>
      mainLine.split(" ").map((word) => {
        const clean = word.replace(/[^a-zA-Z’“”]/g, "").toLowerCase();
        const highlightTargets = ["spark", "emotion", "identity", "this", "is", "it"];
        const isHighlight = highlightTargets.includes(clean);
        return { word, isHighlight };
      }),
    [],
  );

  return (
    <section className="about-section min-h-[90vh] relative bg-background px-[6vw]">
      <div className="about-main-wrapper">
        <div className="about-main centered-text w-full max-w-[900px] mx-auto space-y-4">
          <span className="about-line font-display font-extrabold leading-[0.95] tracking-[-0.02em] flex flex-wrap justify-center gap-2">
            {words.map(({ word, isHighlight }, idx) => (
              <span
                key={`${word}-${idx}`}
                className={`word ${isHighlight ? "highlight-brush" : ""}`}
              >
                {word}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="about-note text-muted-foreground">
        {sideCopy}
      </div>
    </section>
  );
};

export default Storytelling;
