"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Signature motif — the actual Shrandha Labs logo mark, used ambiently
 * across the site (hero backdrop, loader, section dividers) so the brand's
 * own symbol becomes the site's recurring visual language, instead of a
 * generic abstract shape.
 */
export function Knot({ className = "", spin = true }: { className?: string; spin?: boolean }) {
  return (
    <motion.div
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 50, repeat: Infinity, ease: "linear" } : undefined}
      style={{ position: "relative" }}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        fill
        sizes="(max-width: 768px) 300px, 600px"
        style={{ objectFit: "contain" }}
        priority={false}
      />
    </motion.div>
  );
}
