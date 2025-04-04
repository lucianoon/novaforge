import { MotionProps } from "framer-motion";

// Reveal animation that triggers when element enters viewport
export const revealAnimation: MotionProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Card hover animation for services and testimonials
export const cardHoverAnimation: MotionProps = {
  whileHover: { 
    y: -5,
    transition: { duration: 0.3 }
  }
};

// Staggered reveal for children elements
export function staggeredReveal(delayStep: number = 0.1): MotionProps {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      delay: delayStep 
    }
  };
}

// Container for staggered children
export const staggerContainer: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Child item for staggered animation
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};
