"use client";
import { motion } from "framer-motion";

/**
 * Signature motif — a line-art rendering of the Shrandha Labs triquetra mark,
 * used ambiently across the site (hero backdrop, loader, section dividers)
 * so the brand's own geometry becomes the site's recurring visual language.
 */
export function Knot({ className = "", spin = true }: { className?: string; spin?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined}
    >
      <g fill="none" strokeWidth="10" strokeLinecap="round">
        <circle cx="200" cy="120" r="82" stroke="#37D3E0" opacity="0.9" />
        <circle cx="150" cy="230" r="82" stroke="#F5A623" opacity="0.9" />
        <circle cx="250" cy="230" r="82" stroke="#F0607A" opacity="0.9" />
      </g>
    </motion.svg>
  );
}
