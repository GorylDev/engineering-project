"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export function ActionButton({ children, ...props }: HTMLMotionProps<"button">) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      {...props}
      {...(reducedMotion || props.disabled ? {} : { whileTap: { scale: 0.98 } })}
      transition={{ duration: 0.12 }}
    >
      {children}
    </motion.button>
  );
}

export function ViewTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={reducedMotion ? false : { opacity: [0.86, 1], y: [3, 0] }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
