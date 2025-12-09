import React from "react";

interface ScrollFloatWordsProps {
  text: string;
  containerClassName?: string;
  textClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloatWords = ({
  text,
  containerClassName = "",
  textClassName = "",
}: ScrollFloatWordsProps) => {
  // Temporary safe fallback component
  // Waiting for final animation code from user
  return (
    <div className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{text}</span>
    </div>
  );
};

export default ScrollFloatWords;
