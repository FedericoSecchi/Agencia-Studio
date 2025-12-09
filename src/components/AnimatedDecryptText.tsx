import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "motion/react";
import "../styles/decrypt.css";

type AnimateOn = "load" | "hover" | "view";

interface AnimatedDecryptTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  animateOn?: AnimateOn;
  parentClassName?: string;
  encryptedClassName?: string;
  revealDirection?: "left" | "right"; // kept for compatibility, not used in this variant
  children?: ReactNode;
  renderContent?: (displayText: string) => ReactNode;
}

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  overlay: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: 0,
    border: "none",
    clip: "rect(0,0,0,0)",
    overflow: "hidden",
  },
};

export default function AnimatedDecryptText({
  text,
  speed = 50,
  maxIterations = 20,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()",
  animateOn = "load",
  parentClassName = "",
  encryptedClassName = "",
  renderContent,
}: AnimatedDecryptTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const indexRef = useRef(0);
  const iterationsRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  const decryptText = () => {
    const fullText = text;
    const currentIndex = indexRef.current;

    if (currentIndex >= fullText.length) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

    const updatedText = fullText
      .split("")
      .map((char, idx) => {
        if (idx < currentIndex) return char;
        if (char === " ") return " ";
        return getRandomChar();
      })
      .join("");

    setDisplayText(updatedText);

    iterationsRef.current += 1;

    if (iterationsRef.current >= maxIterations) {
      indexRef.current += 1;
      iterationsRef.current = 0;
    }

    animationFrameRef.current = requestAnimationFrame(() => setTimeout(decryptText, speed));
  };

  const handleStart = () => {
    if (hasAnimated) return;
    setHasAnimated(true);
    setIsScrambling(true);
    decryptText();
  };

  useEffect(() => {
    if (animateOn === "load") {
      handleStart();
    }

    if (animateOn === "view") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) handleStart();
          });
        },
        { threshold: 0.5 },
      );

      if (wrapperRef.current) observer.observe(wrapperRef.current);

      return () => {
        if (wrapperRef.current) observer.unobserve(wrapperRef.current);
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (animateOn !== "hover") return;
    if (!isHovering) {
      // Reset when leaving hover
      setDisplayText("");
      setRevealedIndices(new Set());
      setIsScrambling(false);
      iterationsRef.current = 0;
      indexRef.current = 0;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    handleStart();
  }, [isHovering, animateOn]); // eslint-disable-line react-hooks/exhaustive-deps

  const rendered =
    displayText ||
    (animateOn === "hover"
      ? text.replace(/./g, "•")
      : ""); /* basic placeholder while waiting for scramble */

  return (
    <motion.span
      className={parentClassName}
      ref={wrapperRef}
      whileHover={animateOn === "hover" ? { opacity: 0.85 } : {}}
      style={styles.wrapper}
      onMouseEnter={animateOn === "hover" ? () => setIsHovering(true) : undefined}
      onMouseLeave={animateOn === "hover" ? () => setIsHovering(false) : undefined}
    >
      <span aria-hidden="true" style={styles.overlay}>
        {text}
      </span>
      <span className={encryptedClassName}>
        {renderContent
          ? renderContent(rendered || text)
          : (rendered || text).split("").map((char, index) => {
              const isRevealedOrDone =
                revealedIndices.has(index) || !isScrambling || !isHovering || animateOn !== "hover";
              return (
                <span key={index} className={isRevealedOrDone ? "" : encryptedClassName}>
                  {char}
                </span>
              );
            })}
      </span>
    </motion.span>
  );
}

