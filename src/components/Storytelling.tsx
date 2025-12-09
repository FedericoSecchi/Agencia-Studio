import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainLines = [
  "We craft brands and digital experiences",
  "built to spark emotion, sharpen identity,",
  "and make people feel “this is it.”",
];

const sideCopy =
  "A studio driven by clarity, bold ideas, and design that actually works.";

const Storytelling = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainLinesRef = useRef<HTMLDivElement>(null);
  const sideNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !mainLinesRef.current || !sideNoteRef.current) return;

    const lines = mainLinesRef.current.querySelectorAll(".about-line");

    // Cinematic stagger for main lines
    gsap.fromTo(
      lines,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // Delayed fade for side note
    gsap.fromTo(
      sideNoteRef.current,
      { opacity: 0, y: 40, x: -10 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[90vh] flex items-center bg-background"
    >
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left: Main editorial statement (80%) */}
          <div
            ref={mainLinesRef}
            className="lg:col-span-4 space-y-3"
          >
            {mainLines.map((line) => (
              <div
                key={line}
                className="about-line font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-[80%]"
              >
                {line}
              </div>
            ))}
          </div>

          {/* Right: Side note (20%) */}
          <div
            ref={sideNoteRef}
            className="lg:col-span-1 pt-2 lg:pt-3"
          >
            <p className="body-regular text-muted-foreground tracking-[0.08em] max-w-xs">
              {sideCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Storytelling;
