import type { Variants, TargetAndTransition } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
    },
  },
};

export const buttonVariants: TargetAndTransition = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};
