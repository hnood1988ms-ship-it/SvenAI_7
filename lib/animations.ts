/**
 * مكتبة Animations محسّنة
 */

// Framer Motion variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// CSS Animation classes
export const animationClasses = {
  fadeIn: 'animate-fadeIn',
  slideInRight: 'animate-slideInRight',
  slideInLeft: 'animate-slideInLeft',
  scaleIn: 'animate-scaleIn',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
} as const;

// Animation delays
export const animationDelays = {
  100: 'animation-delay-100',
  200: 'animation-delay-200',
  300: 'animation-delay-300',
  400: 'animation-delay-400',
} as const;

// Helper function
export function getAnimationClass(
  animation: keyof typeof animationClasses,
  delay?: keyof typeof animationDelays
) {
  const classes = [animationClasses[animation]];
  if (delay) {
    classes.push(animationDelays[delay]);
  }
  return classes.join(' ');
}
