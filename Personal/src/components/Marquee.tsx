"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// cn utility function
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  speed?: number;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = true, // default to true to run top-to-bottom vertically
  pauseOnHover = false,
  children,
  speed = 49, // user requested 49 speed
  vertical = true, // vertical scrolling
  repeat = 3,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const singleContentBlockRef = useRef<HTMLDivElement | null>(null);
  
  const animX = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  
  const [loopDistance, setLoopDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Measure size once on mount and on resize, rather than on every animation frame (prevents layout thrashing)
  useEffect(() => {
    const measure = () => {
      if (!singleContentBlockRef.current || !contentRef.current) return;
      const size = vertical
        ? singleContentBlockRef.current.offsetHeight
        : singleContentBlockRef.current.offsetWidth;

      const contentStyle = window.getComputedStyle(contentRef.current);
      const computedGap = parseFloat(
        vertical ? contentStyle.rowGap || "0" : contentStyle.columnGap || "0"
      );
      setLoopDistance(size + computedGap);
    };

    const timer = setTimeout(measure, 150);

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [vertical, children]);

  // Animation frame loop
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      const delta = time - previousTimeRef.current;

      // Only scroll when not hovered to support the scatter state cleanly
      if (contentRef.current && loopDistance > 0 && !isHovered) {
        const dx = (speed * delta) / 1000;
        const effectiveDx = reverse ? dx : -dx;
        animX.current += effectiveDx;

        // Keep animX within bounds of loopDistance to prevent overflow
        if (Math.abs(animX.current) >= loopDistance * 2) {
          animX.current = animX.current % loopDistance;
        }

        // Shift offset to prevent gaps when scrolling in positive direction
        let translateVal = animX.current;
        if (effectiveDx > 0) {
          translateVal = (animX.current % loopDistance) - loopDistance;
        } else {
          translateVal = animX.current % loopDistance;
        }

        if (vertical) {
          contentRef.current.style.transform = `translateY(${translateVal}px)`;
        } else {
          contentRef.current.style.transform = `translateX(${translateVal}px)`;
        }
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [loopDistance, speed, reverse, vertical, isHovered]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Wrap children and inject deterministic scatter effect based on index
  const childrenCount = React.Children.count(children);
  const animatedChildren = React.Children.map(children, (child, idx) => {
    if (!React.isValidElement(child)) return child;

    // Disperse vectors based on circle layout for premium scatter visual
    const angle = (idx * 2 * Math.PI) / Math.max(childrenCount, 1);
    const distance = 80 + (idx % 3) * 30; // spread distance
    const scatterX = Math.cos(angle) * distance;
    const scatterY = Math.sin(angle) * distance;
    const scatterRotate = (idx % 2 === 0 ? 1 : -1) * (45 + (idx % 3) * 15);

    return (
      <motion.div
        animate={
          isHovered
            ? {
                x: scatterX,
                y: scatterY,
                rotate: scatterRotate,
                opacity: 0,
                scale: 0.1,
                filter: "blur(4px)",
              }
            : {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
        }}
        className="flex items-center justify-center flex-shrink-0"
      >
        {child}
      </motion.div>
    );
  });

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden [--gap:1.5rem] [gap:var(--gap)] select-none",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // Reset previous ref time to avoid jumps after unhovering
        previousTimeRef.current = null;
      }}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]",
          vertical ? "flex-col" : "flex-row"
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? singleContentBlockRef : null}
              className={cn(
                "flex shrink-0 [gap:var(--gap)]",
                vertical ? "flex-col" : "flex-row"
              )}
            >
              {animatedChildren}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Marquee;
