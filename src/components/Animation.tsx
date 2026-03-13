"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

interface ImageAnimationProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}


interface ScaleInProps extends AnimatedContentProps {
  initialY?: number;
  targetY?: number;
  initialScale?: number;
  targetScale?: number;
}

interface ScaleInProps extends AnimatedContentProps {
  initialY?: number;
  targetY?: number;
  initialScale?: number;
  targetScale?: number;
}

// Enhanced interface for components that need additional props
interface StaggeredContainerProps extends AnimatedContentProps {
  staggerDelay?: number;
  delayChildren?: number;
}

interface TextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

// Utility function to combine classes
const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// 3. Scale up animation
export const ScaleUp: React.FC<AnimatedContentProps> = ({
  children,
  className = "",
  style = {},
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// 5. Staggered children animation - Enhanced
export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className = "",
  style = {},
  staggerDelay = 0.2,
  delayChildren = 0.1,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={combineClasses(
        "mx-auto flex flex-nowrap gap-5 md:flex-row",
        className,
      )}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
};

// 20. Wavy text animation - Enhanced
export const EntranceWave: React.FC<TextAnimationProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
}) => {
  // Handle both <br> and \n for flexibility
  let lines = text.split(/<br\s*\/?>/i); // Handle <br>, <br/>, <br />
  if (lines.length === 1) {
    lines = text.split("\n");
  }

  let charIndex = 0; // Keep track of overall character index for staggered animation

  return (
    <div className={combineClasses("flex flex-col", className)}>
      {lines.map((line: string, lineIndex: number) => (
        <div key={lineIndex} className="flex">
          {line.split("").map((char: string, index: number) => {
            const currentCharIndex = charIndex++;
            return (
              <motion.span
                key={`${lineIndex}-${index}`}
                className="inline-block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration,
                  delay: delay + currentCharIndex * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// 27. Bottom to Top Reveal
export const RevealMaskBottom: React.FC<ImageAnimationProps> = ({
  children,
  className = "",
  duration = 1.5,
}) => {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: duration * 1.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

//29. hover image positon changed
export const HeroHighlightAnimation: React.FC<AnimatedContentProps> = ({
  children,
  className = "",
  style = {},
  delay = 0.7,
  duration = 2,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      whileInView={{
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        bottom: "0%",
      }}
      initial={{
        borderRadius: "999px 999px 0 0",
      }}
      viewport={{ once: true, amount: 0.3 }} // Reverses when out of view
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease for "smooth production level" feel
      }}
    >
      {children}
    </motion.div>
  );
};

// 31. Optimized Fade In Up (Standard Element Entrance)
export const FadeInUp: React.FC<AnimatedContentProps> = ({
  children,
  className = "",
  style = {},
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

// 32. Optimized Stagger Text Reveal (Word by Word Mask)
export const StaggerTextReveal: React.FC<TextAnimationProps> = ({
  text,
  className = "",
  delay = 0,
  // duration = 0.8,
}) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "visible", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 33. Optimized Parallax Image (Performance Focused)
export const ParallaxImage: React.FC<ImageAnimationProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Use transform for GPU acceleration
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.div
        style={{ y }}
        className="will-change-transform h-[120%] w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

// 17. Bottom to position
export const SlideInBottom: React.FC<AnimatedContentProps> = ({
  children,
  className = "",
  style = {},
  delay = 0,
  duration = 0.8,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// 30. Optimized Fade In Block (Simple & Performant)
export const FadeInBlock: React.FC<AnimatedContentProps> = ({
  children,
  className = "",
  style = {},
  delay = 0,
  duration = 0.6,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};


export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className = "",
  style = {},
  duration = 0.8,
  delay = 0,
  initialY = 0,
  targetY = 0,
  initialScale = 1,
  targetScale = 1.18,
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0.7, scale: initialScale, y: initialY }}
      whileInView={{ opacity: 1, scale: targetScale, y: targetY }}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};