import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroImage1 from "@/assets/hero-collage-1.jpg";
import heroImage2 from "@/assets/hero-collage-2.jpg";
import heroImage3 from "@/assets/hero-collage-3.jpg";
import { scrollToSection } from "@/utils/scroll";

const changingWords = ["brands", "websites", "experiences"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Word change animation
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % changingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (wordRef.current) {
      gsap.fromTo(
        wordRef.current,
        { opacity: 0, y: 20, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [currentWordIndex]);

  useEffect(() => {
    // Headline wave animation
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 60, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // Collage explosion animation
    if (collageRef.current) {
      const images = collageRef.current.querySelectorAll(".collage-image");
      gsap.fromTo(
        images,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }
  }, []);

  const headlineText = "We design";

  return (
    <section className="relative min-h-screen bg-background pt-32 pb-20 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="relative z-10">
            <h1
              ref={headlineRef}
              className="headline-large mb-8"
              style={{ perspective: "1000px" }}
            >
              {headlineText.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-4">
                  {word}
                </span>
              ))}
              <br />
              <span
                ref={wordRef}
                key={currentWordIndex}
                className="inline-block text-primary"
              >
                {changingWords[currentWordIndex]}
              </span>
              <br />
              <span className="word inline-block">that feel</span>
              <br />
              <span className="word inline-block">intentional.</span>
            </h1>

            <p className="body-large text-muted-foreground max-w-lg mb-10">
              A creative studio focused on visual identity, modern websites, and
              digital content for teams that care about how they look, not just
              what they sell.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("#contact")}
              >
                Start a project
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("#work")}
              >
                See our work
              </Button>
            </div>

            {/* Sticker - Only visible on XL screens to prevent overlap with CTA buttons */}
            <div className="hidden xl:block absolute -bottom-10 right-0 lg:right-20 sticker w-24 h-24 text-sm">
              ✦ New
            </div>
          </div>

          {/* Right: Collage */}
          <div ref={collageRef} className="relative h-[600px] lg:h-[700px]">
            {/* Main image */}
            <div
              className="collage-image absolute top-0 right-0 w-[85%] h-[60%] rounded-2xl overflow-hidden shadow-2xl"
              style={{ transform: "rotate(3deg)" }}
            >
              <img
                src={heroImage1}
                alt="Creative studio workspace"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary image */}
            <div
              className="collage-image absolute bottom-20 left-0 w-[50%] h-[45%] rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: "rotate(-5deg)" }}
            >
              <img
                src={heroImage2}
                alt="Designer sketching"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tertiary image */}
            <div
              className="collage-image absolute bottom-0 right-10 w-[45%] h-[35%] rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: "rotate(2deg)" }}
            >
              <img
                src={heroImage3}
                alt="Website design"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-primary rounded-full animate-bounce-subtle" />
            <div
              className="absolute bottom-40 right-0 text-6xl animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              😎
            </div>
            <div
              className="absolute top-40 right-20 text-4xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
