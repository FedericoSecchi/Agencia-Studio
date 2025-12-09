import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAboutAnimations = () => {
  const ctx = gsap.context(() => {
    const words = document.querySelectorAll(".about-line .word");

    // Staggered word entrance
    gsap.from(words, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.06,
    });

    // Highlight brush pop
    gsap.from(".highlight-brush", {
      scale: 0.96,
      opacity: 0.9,
      duration: 0.8,
      ease: "back.out(2)",
      delay: 0.2,
    });

    // Micro-motion on scroll for the main block
    gsap.to(".about-main-wrapper", {
      y: 4,
      rotation: 0.15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return () => ctx.revert();
};

