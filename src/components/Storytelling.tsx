import { useEffect, useRef } from "react";
import gsap from "gsap";

const mainLines = [
  "We craft brands and digital experiences built to spark emotion, sharpen identity, and make people feel “this is it.”",
];

const sideCopy = "A studio driven by clarity, bold ideas, and design that actually works.";

const Storytelling = () => {
  const mainLinesRef = useRef<HTMLDivElement>(null);
  const sideNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-line", {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.18,
      });

      if (sideNoteRef.current) {
        gsap.from(sideNoteRef.current, {
          opacity: 0,
          y: 24,
          duration: 1,
          delay: 0.25,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section min-h-[90vh] relative bg-background px-[6vw]">
      <div className="about-main-wrapper">
        <div
          ref={mainLinesRef}
          className="about-main centered-text w-full max-w-[900px] mx-auto space-y-4"
        >
          {mainLines.map((line) => (
            <span
              key={line}
              className="about-line font-display font-extrabold leading-[0.95] tracking-[-0.02em]"
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={sideNoteRef}
        className="about-note text-muted-foreground"
      >
        {sideCopy}
      </div>
    </section>
  );
};

export default Storytelling;
